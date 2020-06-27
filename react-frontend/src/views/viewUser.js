import React from "react";
import 'styles/view.css'

function ViewUser(props)  {
    console.log(props)
    return (
        <div className="view">
            <p> testing view User {props.person_name}</p>
        </div>
    );
}

export default ViewUser;