import React, { useRef, useState } from "react";
import "./styles.css";
import SockJSClient from "./components/SockJS";
import { sendMessage, ResponseSendMessage } from "./utils/sendMessage";

const SOCKET_URL = "http://localhost:8080/chat-server";

const Chat = () => {
    const messageToOne = useRef(null);
    const [messages, setMessages] = useState([]);
    const [erro, setErro] = useState(false);

    function onMessage(msg) {
        setMessages(messages => {
            const messagesNewState = [...messages, msg.content]
            return messagesNewState;
        })
    }

    async function handleSendMessage(event) {
        if (messageToOne !== null) {
            const response = await sendMessage({
                sender: "Client",
                content: messageToOne.current
            });
            if (response === ResponseSendMessage.ERRO) {
                setErro(true);
            }
        }
    }

    if (erro) {
        return (
            <div>
                <h1>ERROR</h1>
            </div>
        )
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
                    <button onClick={handleSendMessage}>
                        {"<-"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;