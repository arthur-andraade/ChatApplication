import React, { useRef, useState } from "react";
import "./styles.css";
import SockJSClient from "./components/SockJS";
import Conversation from './components/conversation';
import Contacts from "./components/list";
import { sendMessage, ResponseSendMessage } from "./utils/sendMessage";
import { useUser } from "../../context/index";
import ChatServer from "../../services/chat-server";

const Chat = () => {
    const messageToOne = useRef(null);
    const [messages, setMessages] = useState([]);
    const [erro, setErro] = useState(false);
    const { user, setUser } = useUser();
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
        const contacts = users.map((userList) => {
            if(userList.name === user){
                return {
                    ...userList,
                    name: "YOU",
                }
            }
            return userList;
        });
        setContacts(contacts);
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

    function handleExit(event) {
        ChatServer.post("/disconnect", {
            name: user,
        }).then(() => {
            setUser("")
        }).catch(() => {
            setErro(true);
        });
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="chat-side">
                <div className="chat-exit">
                    <button onClick={handleExit}>
                        EXIT
                    </button>
                </div>
                <Contacts contacts={contacts} />
            </div>
        </div>
    )
}

export default Chat;