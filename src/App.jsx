import React from 'react';

import './App.css';
import Calculator from './Components/Container';
import FooterComponent from './Components/FooterComponent';

import * as actions from "./Actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";



class App extends React.Component {
render(){

    return (
        <div className="App">
         <div id="wrapper" className={this.props.themeFlag ? "darkTheme":"lightTheme"}>
      <div id="app">
        <Calculator />
    
      </div>
    <FooterComponent props={this.props} />
    </div>
    
        </div>
      );
}
   
  
}

function mapStateToProps(state) {
	return {
        themeFlag: state.CalculatorReducer.themeFlag,
    scientificFlag: state.CalculatorReducer.scientificFlag
        
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default connect(
	(mapStateToProps),
	(mapDispatchToProps)
)(App);

