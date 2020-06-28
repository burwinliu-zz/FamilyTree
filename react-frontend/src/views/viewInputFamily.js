import React from "react";
import 'styles/view.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
<<<<<<< HEAD
import {InputFamily} from "services/serviceInput"
=======
import {InputFamily} from "services/serviceInput";
>>>>>>> 79634ad6a5a9ff71d63631a58e0c7d26deb72b9d

function ViewInputFamily()  {
    const [inputValue, setInputValue] = React.useState("family");

<<<<<<< HEAD
    const clickenter=()=>{
        console.log(inputValue)
=======
    const clickEnter=()=>{
>>>>>>> 79634ad6a5a9ff71d63631a58e0c7d26deb72b9d
        InputFamily(inputValue);
    }
    const onChangeInput = (event) =>{
        setInputValue(event.target.value);
    }

    return (
        <div itemID="family-view-wrapper" className="view">
            <TextField 
                id="infamily" 
                label="input family here"
                onChange={onChangeInput}
            />
            <Button variant="contained" onClick={clickEnter}>
            enter
            </Button>
        </div>
    );
}

export default ViewInputFamily;