import React from "react";
import { useListUsers } from "../../../../context";
import "./styles.css";

const UsersList = () => {

    const { listUsers } = useListUsers();

    return (
        <div id="userlist">
            {listUsers.map((user, index)=> (
                <div key={index} className="user">
                    
                </div>
            ))}
        </div>
    )
}
export default UsersList;