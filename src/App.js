import React from 'react';

import './App.css';
import Calculator from './Components/Container';
import FooterComponent from './Components/FooterComponent';
import { render } from 'react-dom';



function App(props) {

    return (
      <div className="App">
       <div id="wrapper">
    <div id="app">
      <Calculator />
  
    </div>
  <FooterComponent />
  </div>
  
      </div>
    );
  
}

export default App;
