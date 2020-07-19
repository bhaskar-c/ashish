import React, { Component } from 'react'
import synth from './../audio/synth'



class Key extends Component {

  constructor(props) {
    super(props)
    this.props = props
    this.synth = props.synth
    this.maxHeight = props.maxHeight;
    this.noteEventUIUpdater = props.noteEventUIUpdater;
    this.defaultVelocity = .5;
    
  }
  
  
  
  getNoteNameWithOctave(noteNumber){
    //noteNumberInOneOctave ranges from 0 to 11
    //octave ranges from 0 to 6
    let octave = this.props.octave
    let lookup = {'notes': ["S", "r", "R", "g", "G", "M", "m", "P", "d", "D", "n", "N"],  'octavesymbols': ["'''","''", "'","","'","''", "'''"]}
    var noteNameWithoutOctave = lookup['notes'][noteNumber%12]
    var octaveSymbol = lookup['octavesymbols'][octave]
    if (octave < 3){return octaveSymbol+ noteNameWithoutOctave}
    else{return noteNameWithoutOctave + octaveSymbol}
    
  }

  playNote() {
    this.props.synth.press(this.props.noteNumber, this.defaultVelocity);
    this.noteEventUIUpdater(this.props.noteNumber, this.defaultVelocity);

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
    var noteName = this.getNoteNameWithOctave(this.props.noteNumber)
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
