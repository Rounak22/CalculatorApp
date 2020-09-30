import React from 'react';
import AutoScale from "./AutoScale";

export default class CalculatorViewContainer extends React.Component {
  render() {
    const { value, ...props } = this.props
    //For correct amount of commas for thoushands and millions
    const language = 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    })
    
    // Add back missing .0 in e.g. 12.0
    const match = value.match(/\.\d*?(0*)$/)
    
    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]
    console.log(value)
    return (
      <div {...props} >
        <AutoScale>{formattedValue}</AutoScale>
      </div>
    )
  }
}