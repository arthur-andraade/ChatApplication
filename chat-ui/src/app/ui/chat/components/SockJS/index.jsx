import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useUser } from "../../../../context";
import ChatServer from "../../../../services/chat-server";

const SockJSComponent = ({ url, onMessage, onUser }) => {
    const { user } = useUser()
    const [connected, setConnected] = useState(false);
    const clientSockStompJS = useRef(null);

    useEffect(() => {
        clientSockStompJS.current = Stomp.over(new SockJS(url));
        clientSockStompJS.current.connect({}, (frame) => {
            setConnected(true);
        });
    }, []);

    useEffect(() => {
        if (connected) {
            ChatServer.post("/connect", {
                name: user,
                status: "on"
            }).then(() => {
                clientSockStompJS.current.subscribe('/topic/public', (messageFromServer) => {
                    onMessage(JSON.parse(messageFromServer.body));
                });
                clientSockStompJS.current.subscribe('/topic/contacts', (user) => {
                    onUser(JSON.parse(user.body));
                });
            })
        }

        return () => {
            if (connected) {
                ChatServer.post("/disconnect", {
                    user: "Exemplo",
                    status: "off"
                }).then(() => {
                    clientSockStompJS.current.disconnect()
                })
            }
        }
    }, [connected]);

    return (<></>);
}

export default SockJSComponent;