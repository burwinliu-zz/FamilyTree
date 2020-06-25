import React from 'react';
import 'styles/App.css';
import NavBar from 'components/componentNavbar'
import Footer from "components/componentFooter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ViewHome from "./view/viewHome";
import ViewUser from "./view/viewUser";
import ViewFamily from "./view/viewFamily";
import ViewSearchFamily from "./view/viewSearchFamily";
import ViewSearchUser from "./view/viewSearchUser";
import ViewInputUser from "./view/viewInputUser";
import ViewInputFamily from "./view/viewInputFamily";

function App()  {
    return (
        <div className="App">
            <NavBar/>
            <Router>
                <div className='body'>
                    <Switch>
                        <Route path={"/"} exact component={ViewHome}/>
                        <Route path={"/user"} exact component={ViewUser}/>
                        <Route path={"/family"} exact component={ViewFamily}/>
                        <Route path={"/search-user"} exact component={ViewSearchUser}/>
                        <Route path={"/search-family"} exact component={ViewSearchFamily}/>
                        <Route path={"/input-user"} exact component={ViewInputUser}/>
                        <Route path={"/input-family"} exact component={ViewInputFamily}/>
                    </Switch>
                </div>
            </Router>
            <Footer/>
        </div>
    );
}

export default App;
