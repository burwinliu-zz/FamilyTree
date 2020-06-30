import React from "react";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import 'styles/view.css'
import {InputUser} from "../services/serviceInput";

function ViewInputUser()  {
    const [inputValue, setInputValue] = React.useState("Name");

    const clickInput=()=>{
        console.log(inputValue)
        InputUser(inputValue);
    }
    const onChangeInput = (event) =>{
        setInputValue(event.target.value);
    }

    return (
        <div className="view-body">
            <TextField
                id="text"
                type="text"
                placeholder={inputValue}
                onChange={onChangeInput}
            />
            <Button onClick={clickInput}>Default</Button>
        </div>
    );
}

export default ViewInputUser;