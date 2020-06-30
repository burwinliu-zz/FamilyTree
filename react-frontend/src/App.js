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

function App()  {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <div className={"route-wrapper"}>
                    <Switch>
                        <Route
                            path={"/"}
                            exact
                            render={(props) => <ViewHome {...props}/>}
                        />
                        <Route
                            path={"/user"}
                            exact
                            render={(props) => <ViewUser {...props}/>}
                        />
                        <Route
                            path={"/family"}
                            exact
                            render={(props) => <ViewFamily {...props}/>}
                        />
                        <Route
                            path={"/search-user"}
                            exact
                            render={(props) => <ViewSearchUser {...props}/>}
                        />
                        <Route
                            path={"/search-family"}
                            exact
                            render={(props) => <ViewSearchFamily {...props}/>}
                        />
                        <Route
                            path={"/input-user"}
                            exact
                            render={(props) => <ViewInputUser {...props}/>}
                        />
                        <Route
                            path={"/input-family"}
                            exact
                            render={(props) => <ViewInputFamily {...props}/>}
                        />
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </div>

    );
}

export default App;
