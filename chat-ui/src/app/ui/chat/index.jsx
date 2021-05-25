import React, { useRef, useState } from "react";
import "./styles.css";
import SockJSClient from "./components/SockJS";

const SOCKET_URL = "http://localhost:8080/chat-server";

const Chat = () => {
    const messageToOne = useRef(null);
    const [messages, setMessages] = useState([]);

    function onMessage(msg) {
        setMessages(messages => {
            const messagesNewState = [...messages, msg.content]
            return messagesNewState;
        })
    }

    return (
        <div id="chatContainer">
            <SockJSClient
                url={SOCKET_URL}
                onMessage={onMessage}
            />
            <div id="chat">
                <div className="conversation">
                    {
                        messages.map((message, index) => {
                            return (<p key={index}>{message}</p>)
                        })
                    }

                </div>
                <div className="send">
                    <input
                        className="msg"
                        type="text"
                        placeholder="Write message..."
                        onChange={(event) => {
                            messageToOne.current = event.target.value;
                        }}
                    />
                    <button>
                        {"<-"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;