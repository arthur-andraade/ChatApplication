import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const SockJSComponent = ({ url, onMessage }) => {
    const [connected, setConnected] = useState(false);
    const clientSockStompJS = useRef(null);

    useEffect(() => {
        clientSockStompJS.current = Stomp.over(new SockJS(url));
        clientSockStompJS.current.connect({}, (frame) => {
            setConnected(true);
            clientSockStompJS.current.subscribe('/topic/public', (messageFromServer) => {
                console.log(messageFromServer);
                onMessage(JSON.parse(messageFromServer.body));
            })
        });

        return () => {
            if (clientSockStompJS !== null) {
                clientSockStompJS.current.disconnect(() => {
                    console.log("Desconectado")
                })
            }
        }
    }, []);

    useEffect(() => {
        if (connected) {
            clientSockStompJS.current.send('/app/chat', {}, JSON.stringify({
                sender: "Client",
                content: "Hello Salve Word"
            }));
        }
    }, [connected]);


    return (<></>);
}

export default SockJSComponent;