import React, { Component } from 'react'
import synth from './../audio/synth'



class Key extends Component {

  constructor(props) {
    super(props)
    this.props = props
    this.synth = props.synth
    this.maxHeight = props.maxHeight;
    this.noteEventUIUpdater = props.noteEventUIUpdater;
    
  }

  playNote() {
    this.props.synth.press(this.props.noteNumber, 1);
    this.noteEventUIUpdater(this.props.note);

  }
  stopNote(){
    this.props.synth.release(this.props.noteNumber);
    
  }

  getKeyHeight(){
    let height;
	let keyHeightWhite = this.maxHeight;
  let keyHeightBlack = 0.6 * keyHeightWhite
	this.props.color == "key_white" ? height = keyHeightWhite : height = keyHeightBlack
	return height  
  }


  render(){
    var klassName = this.props.color
    var noteName = this.props.note
    var style = {height: this.getKeyHeight() + "px", fontSize: "14px" }
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
