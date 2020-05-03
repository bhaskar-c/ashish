import React, { Component } from 'react'
import Slider from 'react-rangeslider'


class VerticalSlider extends Component {
  constructor (props, context) {
    super(props, context)
    this.props = props
    this.state = { value: 50 }
  }

  handleChange = (value) => {
	this.setState({ value: value })
	this.props.onChange(value)
  }

  render () {
    let { value } = this.state
    return (
      <div className='slider'>
        <div className='slider-label'>{this.props.label}</div>
        <div className='slider-horizontal'>
            <Slider
              min={0}
              max={100}
              value={value}
              onChange={this.handleChange}
            /></div>
          <div className='slider-value'>{value}</div>  
      </div>
    )
  }
}

export default VerticalSlider
