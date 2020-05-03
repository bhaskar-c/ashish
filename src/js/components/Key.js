import React, { Component } from 'react'
import synth from './../audio/synth'



class Key extends Component {

  constructor(props) {
    super(props)
    this.props = props
    this.synth = props.synth
    
  }

  playNote() {
    this.props.synth.press(this.props.noteNumber, 1);

  }
  stopNote(){
    this.props.synth.release(this.props.noteNumber);
    
  }

  getKeyHeight(){
	  var height
	let keyHeightWhite = Math.min(window.screen.height - (0.2*window.screen.height), 100)
    let keyHeightBlack = 0.6 * keyHeightWhite
	this.props.color == "key_white" ? height = keyHeightWhite : height = keyHeightBlack
	return height  
	  }


  render(){
    var klassName = this.props.color
    var noteName = this.props.note
    var style = {height: this.getKeyHeight() + "px", fontSize: "8px" }
    return (
      <div style={style} className={klassName}
        id={this.props.noteNumber}
        onMouseDown={this.playNote.bind(this)}
        onMouseUp={this.stopNote.bind(this)}
        >
           {noteName}
        </div>
    );
  }

}

export default Key
