import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import darkPng from "../Images/dark.png";
import lightPng from "../Images/light.png";
import * as actions from "../Actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import sciPng from "../Images/sci.png";
import calcPng from "../Images/calci.png";
const useStyles = makeStyles((theme) => ({
  size: {
   width:'50px'
  },
  placement: {
    float: 'right'
  },
  placementRight: {
    float: "left"
  }
}));

 function FooterComponent(props) {
  const classes = useStyles();
  const toggleTheme =  () =>{
 
   props.actions.toggleTheme(props.themeFlag)
  }

  const toggleScientific = () =>{
    props.actions.toggleScientific(props.scientificFlag)
  } 
  return (
    <footer className={props.themeFlag ? "darkTheme":"lightTheme"}>
          <Button className={classes.placementRight} onClick={toggleScientific}>
      
      <img alt="CalcImage" src={props.scientificFlag ? calcPng:sciPng} className={classes.size} />
      
      </Button>
    <Button className={classes.placement} onClick={toggleTheme}>
      
      <img alt="themeImage" src={props.themeFlag ? darkPng:lightPng} className={classes.size} />
      
      </Button>
  </footer>
  );
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
)(FooterComponent);
