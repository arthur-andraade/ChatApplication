import React from "react";
import Chat from "../chat";
import HeaderApp from "../header";
import { useUser } from "../../context";
import SignIn from "../signin";
import "./styles.css";

const ContainerApp = () => {
    const { user } = useUser();
    return (
        <div id="appContainer">
            {
                !user || user.length === 0
                    ? (
                        <SignIn />
                    ) :
                    (
                        <>
                            <HeaderApp />
                            <Chat />
                        </>
                    )

            }
        </div>
    )
}

export default ContainerApp;