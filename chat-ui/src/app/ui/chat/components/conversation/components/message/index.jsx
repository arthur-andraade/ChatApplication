import React from "react";
import "./styles.css";

const Message = ({ isUser, sender, content }) => {
    return (
        <div className={isUser ? "message message-user" : "message"}>
            <div className="msg-body">
                <span className="sender">
                    {sender}
                </span>
                <span className="message-content">
                    {content}
                </span>
            </div>
        </div>
    )
}

export default Message;