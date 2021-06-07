import React from "react";
import "./styles.css";

const Contacts = ({ contacts }) => {

    return (
        <div id="userlist">
            {contacts.map((contact, index) => (
                <div key={index} className="user">

                </div>
            ))}
        </div>
    )
}
export default Contacts;