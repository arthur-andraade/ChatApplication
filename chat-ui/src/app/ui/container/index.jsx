import React from "react";
import Chat from "../chat";
import HeaderApp from "../header";

const ContainerApp = () => {
    return (
        <div id="appContainer">
            <HeaderApp />
            <Chat />
        </div>
    )
}

export default ContainerApp;