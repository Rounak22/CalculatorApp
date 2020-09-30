import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import darkPng from "../Images/dark.png";
import lightPng from "../Images/light.png";
import * as actions from "../Actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  size: {
   width:'50px'
  },
  placement: {
    float: 'right'
  }
}));

 function ScientificKeys(props) {
  const classes = useStyles();
  const toggleTheme =  () =>{
    console.log(props)
   props.actions.toggleTheme(props.themeFlag)
  }
  return (
    <div/>
  );
}

function mapStateToProps(state) {
	return {
		themeFlag: state.CalculatorReducer.themeFlag,
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
)(ScientificKeys);
