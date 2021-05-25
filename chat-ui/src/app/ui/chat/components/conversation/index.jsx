import React from "react";
import { useUser } from "../../../../context"
import Message from "./components/message";
import "./styles.css";

const Conversation = ({ messages }) => {
    const { user } = useUser();
    return (
        <div id="conversation">
            {
                messages.map((message, index) => {
                    return (
                        <Message
                            key={index}
                            isUser={user === message.sender}
                            sender={message.sender}
                            content={message.content}
                        />
                    )
                })
            }
        </div>
    )
}

export default Conversation;