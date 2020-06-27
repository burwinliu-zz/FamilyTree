import React from "react";
import TextField from '@material-ui/core/TextField';
import 'styles/view.css'
import Button from '@material-ui/core/Button';

function ViewInputUser()  {
    return (
        <div className="view">
            <TextField id="text" label="input user here" />
            <Button variant="contained">
            enter
            </Button>
        </div>
    );
}

export default ViewInputUser;