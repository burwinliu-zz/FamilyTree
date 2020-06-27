import React from "react";
import 'styles/view.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function ViewInputFamily()  {
    const [inputValue, setInputValue] = React.useState("family");

    const clickenter=()=>{
        InputFamily(inputValue);
    }
    const onChangeInput = (event) =>{
        setUnputValue(event.target.value);
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