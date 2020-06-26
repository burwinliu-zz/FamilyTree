import React from "react";
import TextField from '@material-ui/core/TextField';

function ViewInputFamily()  {
    return (
        <div className="view">
            
            <p> testing input family </p>
            <TextField id="textbox" type="text" placeholder="input family" varient="outlined"/>
        </div>
    );
}

export default ViewInputFamily;