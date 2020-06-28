import React from "react";
import 'styles/view.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {InputFamily} from "services/serviceInput"

function ViewInputFamily()  {
    const [inputValue, setInputValue] = React.useState("family");

    const clickenter=()=>{
        console.log(inputValue)
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
            <Button variant="contained" onClick={clickenter}>
            enter
            </Button>
        </div>
    );
}

export default ViewInputFamily;