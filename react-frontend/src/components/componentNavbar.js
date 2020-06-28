import React from "react";

import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import InputBase from '@material-ui/core/InputBase';
import Switch from "@material-ui/core/Switch";

import SearchIcon from '@material-ui/icons/Search';

import { Link } from 'react-router-dom';

import 'styles/componentNavbar.css'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {SearchFamily, SearchUser} from "services/serviceSearch";

function Navbar()  {
    // Initialize hooks
    const [isFamily, setIsFamily] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("Search...");

    // Initialize all relevant functions
    const toggleIsFamily = () => {
        setIsFamily((prev) => !prev);
    };
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    function enterButton(event){
        console.log("PRESSED");
        console.log(event.key);
        console.log(event.keyCode);
        if(event.keyCode === 13 && searchValue !== ""){
            console.log("hello");
            console.log(searchValue)
          //  clickSearch();
        }
    }
    const clickSearch = () => {
        if(isFamily){
            // gray out screen, zoom animation post load while waiting for the following function
            SearchFamily(searchValue);
            // pass on information as PROP to viewSearchFamily
            
        }
        else{
            //everything above but in SearchUser
            SearchUser(searchValue);
        }
    };

    // Rendered DOM
    return (
        <div className={'navbar'}>
            <Toolbar>
                <Link to={"/"} className={'navbar-buttons'}>Family Tree</Link>
                <div className={'navbar-right-buttons-group'}>

                    <div className={'navbar-search-wrapper'}>
                        <Button className={'navbar-search-button'} onClick={clickSearch}>
                            <SearchIcon id={'navbar-search-icon'}/>
                        </Button>
                        <InputBase
                            className={'navbar-search-field'}
                            placeholder={searchValue}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={onChangeSearchInput}
                            onKeyDown={enterButton}
                        />
                    </div>
                    <Typography component="div" className={'navbar-component-wrapper'}>
                        <Grid component="label" container alignItems="center" spacing={0}>
                        <Grid item>User Search</Grid>
                        <Grid item>
                            <Switch
                                checked={isFamily}
                                onChange={toggleIsFamily}
                            />
                        </Grid>
                        <Grid item>Family Search</Grid>
                        </Grid>
                    </Typography>
                    <Button component={ Link } to="/input-family" className={'navbar-component-wrapper'}>
                        Input Family
                    </Button>
                    <Button component={ Link } to="/input-user" className={'navbar-component-wrapper'}>
                        Input User
                    </Button>
                    <Button
                        component={ Link }
                        to={{
                            pathname: "/user",
                            query: {
                                id_num:"0",
                                person_name:"milk"
                            }
                        }}
                        className={'navbar-component-wrapper'}
                    >
                        Testing Get User
                    </Button>
                </div>
            </Toolbar>
        </div>
    );
}

export default Navbar;
