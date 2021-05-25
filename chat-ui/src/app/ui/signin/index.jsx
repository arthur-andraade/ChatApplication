import React, { useRef } from "react";
import { useUser } from "../../context"

const SignIn = () => {
    const { setUser } = useUser();
    const userName = useRef("");

    function handleEnterUserName(event) {
        setUser(userName.current);
    }

    return (
        <div id="signin">
            <p>Fill in with your name</p>
            <input
                id="username"
                type="text"
                onChange={(event) => {
                    userName.current = event.target.value;
                }}
            />
            <button onClick={handleEnterUserName}>
                Enter
            </button>
        </div>
    )
}

export default SignIn