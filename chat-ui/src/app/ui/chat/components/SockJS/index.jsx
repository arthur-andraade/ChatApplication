import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useUser } from "../../../../context";
import ChatServer from "../../../../services/chat-server";

const SOCKET_URL = "http://localhost:8080/chat-server";

const SockJSComponent = ({ onMessage, onUser }) => {
    const { user } = useUser()
    const [connected, setConnected] = useState(false);
    const clientSockStompJS = useRef(null);

    useEffect(() => {
        clientSockStompJS.current = Stomp.over(new SockJS(SOCKET_URL));
        clientSockStompJS.current.connect({}, (frame) => {
            setConnected(true);
            clientSockStompJS.current.subscribe('/topic/public', (messageFromServer) => {
                onMessage(JSON.parse(messageFromServer.body));
            });
            clientSockStompJS.current.subscribe('/topic/contacts', (user) => {
                onUser(JSON.parse(user.body));
            });
        });
    }, []);

    useEffect(() => {
        if (connected && user.length !== 0) {
            ChatServer.post("/connect", {
                name: user,
            })
        }

        return () => {
            if (connected) {
                ChatServer.post("/disconnect", {
                    name: user,
                }).then(() => {
                    clientSockStompJS.current.disconnect()
                })
            }
        }
    }, [connected, user]);

    return (<></>);
}

export default SockJSComponent;