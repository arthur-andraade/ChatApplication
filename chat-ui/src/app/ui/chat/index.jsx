import React, { useRef, useState } from "react";
import "./styles.css";
import SockJSClient from "./components/SockJS";
import Conversation from './components/conversation';
import Contacts from "./components/list";
import { sendMessage, ResponseSendMessage } from "./utils/sendMessage";
import { useUser } from "../../context/index";

const Chat = () => {
    const messageToOne = useRef(null);
    const [messages, setMessages] = useState([]);
    const [erro, setErro] = useState(false);
    const { user } = useUser();
    const [contacts, setContacts] = useState([])

    function handleOnMessage(msg) {
        setMessages(messages => {
            const messagesNewState = [...messages, {
                sender: msg.sender,
                content: msg.content
            }]
            return messagesNewState;
        })
    }

    function handleOnUser(users) {
        setContacts(users)
    }

    async function handleSendMessage(event) {
        if (messageToOne.current !== "") {
            const response = await sendMessage({
                sender: user,
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
                onMessage={handleOnMessage}
                onUser={handleOnUser}
            />
            <div id="chat">
                <Conversation messages={messages} />
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
            <Contacts contacts={contacts} />
        </div>
    )
}

export default Chat;