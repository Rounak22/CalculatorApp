import React from 'react';


import CalculatorPad from './CalculatorPad';
import CalculatorViewContainer from './CalculatorViewContainer';

import * as actions from "../Actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Calculator Operations marking
const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
  '**': (prevValue, nextValue) => nextValue * nextValue ,
  '***': (prevValue, nextValue) => nextValue * nextValue *nextValue,
  '%2': (prevValue, nextValue) => Math.sqrt( nextValue ),//Math lib
  '%3': (prevValue, nextValue) => Math.cbrt( nextValue ),
  'log': (prevValue, nextValue) => Math.log( nextValue ),
}
 class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: '0',//default as 0
    operator: null, //default as null
    flagOperand: false
  };
  
  clearAll() {
    this.setState({
      value: null,
      displayValue: '0',
      operator: null,
      flagOperand: false
    })
  }

  clearDisplay() {
    this.setState({
      displayValue: '0'
    })
  }
  
  clearLastChar() {
    const { displayValue } = this.state
    
    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }
  
  toggleSign() {
    const { displayValue } = this.state
    const newValue = parseFloat(displayValue) * -1
    
    this.setState({
      displayValue: String(newValue)
    })
  }
  
  inputPercent() {
    const { displayValue } = this.state
    const currentValue = parseFloat(displayValue)
    
    if (currentValue === 0)
      return
    
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100
    
    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    })
  }
  
  inputDot() {
    const { displayValue } = this.state
    
    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        flagOperand: false
      })
    }
  }
  
  inputDigit(digit) {
    const { displayValue, flagOperand } = this.state
    
    if (flagOperand) {
      this.setState({
        displayValue: String(digit),
        flagOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }
  
  performOperation(nextOperator) {    
    const { value, displayValue, operator } = this.state
    const inputValue = parseFloat(displayValue)
    
    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      
      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }
    
    this.setState({
      flagOperand: true,
      operator: nextOperator
    })
  }
  
  handleKeyDown = (event) => {
    let { key } = event
    
    if (key === 'Enter')
      key = '='
    
    if ((/\d/).test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      this.performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()
      
      if (this.state.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  };
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }
  
  render() {
    const { displayValue } = this.state
    
    const clearDisplay = displayValue !== '0'
    const clearText = clearDisplay ? 'C' : 'AC'
  
    return (
      <div className="calculator">
        <CalculatorViewContainer className={this.props.themeFlag ?"calculator-display-light":"calculator-display-dark"} value={displayValue}/>
        <div className="calculator-keypad">
          <div className="input-keys">
          <div className="function-keys">
        <CalculatorPad className="key-clear" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorPad>
        <CalculatorPad className="key-sign" onPress={() => this.toggleSign()}>±</CalculatorPad>
        <CalculatorPad className="key-percent" onPress={() => this.inputPercent()}>%</CalculatorPad>
      </div>
            
      <div className="digit-keys">
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-0":"lightKeys key-0"}  onPress={() => this.inputDigit(0)}>0</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-dot":"lightKeys key-dot"}  onPress={() => this.inputDot()}>●</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-1":"lightKeys key-1"}  onPress={() => this.inputDigit(1)}>1</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-2":"lightKeys key-2"}  onPress={() => this.inputDigit(2)}>2</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-3":"lightKeys key-3"}  onPress={() => this.inputDigit(3)}>3</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-4":"lightKeys key-4"}  onPress={() => this.inputDigit(4)}>4</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-5":"lightKeys key-5"}  onPress={() => this.inputDigit(5)}>5</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-6":"lightKeys key-6"}  onPress={() => this.inputDigit(6)}>6</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-7":"lightKeys key-7"}  onPress={() => this.inputDigit(7)}>7</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-8":"lightKeys key-8"}  onPress={() => this.inputDigit(8)}>8</CalculatorPad>
        <CalculatorPad className={this.props.themeFlag ? "darkKeys key-9":"lightKeys key-9"}  onPress={() => this.inputDigit(9)}>9</CalculatorPad>
        </div>
          </div>
          <div className="operator-keys">
        <CalculatorPad className="key-divide" onPress={() => this.performOperation('/')}>÷</CalculatorPad>
        <CalculatorPad className="key-multiply" onPress={() => this.performOperation('*')}>×</CalculatorPad>
        <CalculatorPad className="key-subtract" onPress={() => this.performOperation('-')}>−</CalculatorPad>
        <CalculatorPad className="key-add" onPress={() => this.performOperation('+')}>+</CalculatorPad>
        <CalculatorPad className="key-equals" onPress={() => this.performOperation('=')}>=</CalculatorPad>
      </div>

     {this.props.scientificFlag && <div className="scientific-keys">
    <CalculatorPad className="key-clear"  onPress={() => this.performOperation('**')}>^2</CalculatorPad>
    <CalculatorPad className="key-sign"  onPress={() => this.performOperation('***')}>^3</CalculatorPad>
    <CalculatorPad className="key-percent"  onPress={() => this.performOperation('%2')}>sqrt</CalculatorPad>
    <CalculatorPad className="key-percent"  onPress={() => this.performOperation('%3')}>cbrt</CalculatorPad>
    <CalculatorPad className="key-percent"  onPress={() => this.performOperation('log')}>log</CalculatorPad>
 

  </div>} 
        </div>
      </div>
    )
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
)(Calculator);