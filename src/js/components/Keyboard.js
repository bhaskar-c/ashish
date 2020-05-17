import React, { Component } from 'react'
import Key from './Key'


var keyboardStyle = {
  display: "block",
  
  margin: "auto",
  width: 2940 // 49 * keywidth
  

  
};



class Keyboard extends Component {

  constructor(props) {
    super(props);
    this.synth = props.synth;
    this.midi = props.midi;
    this.numberOfOctaves = props.numberOfOctaves;
    this.startWithOctave = props.startWithOctave;
    this.noteEventUIUpdater = props.noteEventUIUpdater;
    this.maxHeight = props.height;
    this.state = {'notes': ["S", "r", "R", "g", "G", "M", "m", "P", "d", "D", "n", "N"],  'octavesymbols': ["'''","''", "'","","'","''", "'''"]}
    
  }

  getNoteNameWithOctave(noteNumberInOneOctave, octave){
    //noteNumberInOneOctave ranges from 0 to 11
    //octave ranges from 0 to 6
    var noteNameWithoutOctave = this.state.notes[noteNumberInOneOctave]
    var octaveSymbol = this.state.octavesymbols[octave]
    if (octave < 3){return octaveSymbol+ noteNameWithoutOctave}
    else{return noteNameWithoutOctave + octaveSymbol}
    
  }


  render(){
    var indents = []
    
    let keyWidth = 60
    var keyNumberOffset = this.startWithOctave *12
      for (var j = 0; j < this.props.numberOfOctaves; j++) {
        var i = keyNumberOffset + j*12 -1;
        indents.push(
            <span key={i.toString()}>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+1} noteNumber={i +1 } note={ this.getNoteNameWithOctave(0, j)}  synth={this.synth} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+2} noteNumber={i +2} note= {this.getNoteNameWithOctave(1, j) } synth={this.synth} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+3} noteNumber={i +3} note= { this.getNoteNameWithOctave(2, j)} synth={this.synth} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+4} noteNumber={i +4} note={this.getNoteNameWithOctave(3, j)} synth={this.synth} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+5} noteNumber={i +5} note={this.getNoteNameWithOctave(4, j)} synth={this.synth} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+6} noteNumber={i+6} note={this.getNoteNameWithOctave(5, j)} synth={this.synth} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+7} noteNumber={i+7} note={this.getNoteNameWithOctave(6, j)} synth={this.synth}/>
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+8} noteNumber={i+8} note={this.getNoteNameWithOctave(7, j)} synth={this.synth} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+9} noteNumber={i+9} note={this.getNoteNameWithOctave(8, j)} synth={this.synth} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+10} noteNumber={i+10} note={this.getNoteNameWithOctave(9, j)} synth={this.synth} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+11} noteNumber={i+11} note={this.getNoteNameWithOctave(10, j)} synth={this.synth}/>
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+12} noteNumber={i+12} note={this.getNoteNameWithOctave(11, j)} synth={this.synth} />
            </li>
            </span>
          );
        }

    return(
        <div style={keyboardStyle} id="keyboard-container">
          {indents}
      </div>
    );
  }
}

export default Keyboard
