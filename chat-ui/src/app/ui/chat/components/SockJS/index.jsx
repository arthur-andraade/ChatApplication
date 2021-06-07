import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const SockJSComponent = ({ url, onMessage, onUser }) => {
    const [connected, setConnected] = useState(false);
    const clientSockStompJS = useRef(null);

    useEffect(() => {
        clientSockStompJS.current = Stomp.over(new SockJS(url));
        clientSockStompJS.current.connect({}, (frame) => {
            setConnected(true);
            clientSockStompJS.current.subscribe('/topic/public', (messageFromServer) => {
                onMessage(JSON.parse(messageFromServer.body));
            })
            clientSockStompJS.current.subscribe('/topic/contacts', (user) => {
                onUser(JSON.parse(user.body));
            })
        });
    }, []);

    useEffect(() => {
        return () => {
            if (connected) {
                clientSockStompJS.current.disconnect()
            }
        }
    }, [connected]);

    return (<></>);
}

export default SockJSComponent;