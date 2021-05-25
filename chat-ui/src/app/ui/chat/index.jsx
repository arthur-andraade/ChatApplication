import React from "react";
import "./styles.css";

const Chat = () => {
    return (
        <div id="chatContainer">
            <div id="chat">
                <div className="conversation">

                </div>
                <div className="send">
                    <input 
                        className="msg" 
                        type="text"
                        placeholder="Write message..." 
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