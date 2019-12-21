import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App()  {
  useEffect(() =>{
    fetch("/LVO").then(response =>
        response.json().then(data=> {
          console.log(data);
        })
    );
  }, []);
  return <div className="App"/>
}

export default App;
