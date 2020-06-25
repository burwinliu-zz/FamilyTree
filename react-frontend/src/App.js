import React from 'react';
import 'styles/App.css';
import NavBar from 'components/componentNavbar'
import Footer from "components/componentFooter";

function App()  {
    return (
        <div className="App">
            <NavBar/>
            <div className='body'>

            </div>
            <Footer/>
        </div>
    );
}

export default App;
