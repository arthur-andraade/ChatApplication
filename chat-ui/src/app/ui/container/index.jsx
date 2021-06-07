import React from "react";
import Chat from "../chat";
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
                            <Chat />
                        </>
                    )

            }
        </div>
    )
}

export default ContainerApp;