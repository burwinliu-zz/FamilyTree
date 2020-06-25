import React from "react";

import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import SearchIcon from '@material-ui/icons/Search';

import { Link } from 'react-router-dom';

import 'styles/componentNavbar.css'

function Navbar()  {
    const [checked, setChecked] = React.useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    };
    return (
        <div className={'navbar'}>
            <Toolbar>
                <Link to={"/"} className={'navbar-buttons'}>Family Tree</Link>
                <div className={'navbar-right-buttons-group'}>

                    <div className={'navbar-search-wrapper'}>
                        <div className={'navbar-search-icon-wrapper'}>
                            <SearchIcon id={'navbar-search-icon'} />
                        </div>
                        <InputBase
                            className={'navbar-search-field'}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={toggleChecked} />}
                        label="Family Search"
                    />
                    <Button component={ Link } to="/input-family" className={'navbar-buttons'}>Input Family</Button>
                    <Button component={ Link } to="/input-user" className={'navbar-buttons'}>Input User</Button>
                </div>
            </Toolbar>
        </div>
    );
}

export default Navbar;
