import React from 'react';
import 'styles/App.css';
import NavBar from 'components/componentNavbar'
import Footer from "components/componentFooter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ViewHome from "views/viewHome";
import ViewUser from "views/viewUser";
import ViewFamily from "views/viewFamily";
import ViewSearchFamily from "views/viewSearchFamily";
import ViewSearchUser from "views/viewSearchUser";
import ViewInputUser from "views/viewInputUser";
import ViewInputFamily from "views/viewInputFamily";
import Container from "@material-ui/core/Container";

function App()  {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                    <Container>
                        <Switch>
                            <Route path={"/"} exact component={ViewHome}/>
                            <Route path={"/user"} exact component={ViewUser}/>
                            <Route path={"/family"} exact component={ViewFamily}/>
                            <Route path={"/search-user"} exact component={ViewSearchUser}/>
                            <Route path={"/search-family"} exact component={ViewSearchFamily}/>
                            <Route path={"/input-user"} exact component={ViewInputUser}/>
                            <Route path={"/input-family"} exact component={ViewInputFamily}/>
                        </Switch>
                    </Container>
                <Footer/>
            </Router>
        </div>

    );
}

export default App;
