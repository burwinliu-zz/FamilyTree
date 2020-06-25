import React from "react";
import 'styles/componentNavbar.css'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

function Navbar()  {
    return (
        <div className={'navbar'}>
            <Toolbar>
                <p>THIS IS WHERE NAVBAR WILL BE</p>
                <div className={'right-buttons-group'}>
                    <Button className={'navbar-buttons'}>Testing</Button>
                    <Button className={'navbar-buttons'}>Buttons</Button>
                </div>
            </Toolbar>
        </div>
    );
}

export default Navbar;
