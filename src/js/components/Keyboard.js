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
    this.numberOfOctaves = 7;
    this.startWithOctave = 0;
    this.noteEventUIUpdater = props.noteEventUIUpdater;
    this.maxHeight = props.height;
    
    
  }



  render(){
    var indents = []
    
    let keyWidth = 60
    var saOffset = this.props.saOffset;
      for (var j = 0; j < this.numberOfOctaves; j++) {
        var i =   j*12 -1 -0 // saOffset;
        indents.push(
            <span key={i.toString()}>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+1} noteNumber={i +1 } synth={this.synth} octave={j} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+2} noteNumber={i +2}  synth={this.synth} octave={j}/>
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+3} noteNumber={i +3} synth={this.synth} octave={j} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+4} noteNumber={i +4} synth={this.synth} octave={j} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+5} noteNumber={i +5} synth={this.synth} octave={j}/>
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+6} noteNumber={i+6} synth={this.synth} octave={j} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+7} noteNumber={i+7} synth={this.synth} octave={j}/>
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+8} noteNumber={i+8} synth={this.synth} octave={j} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+9} noteNumber={i+9} synth={this.synth} octave={j} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+10} noteNumber={i+10} synth={this.synth} octave={j} />
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_black" id={i+11} noteNumber={i+11} synth={this.synth} octave={j}/>
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} noteEventUIUpdater={this.noteEventUIUpdater} color="key_white" id={i+12} noteNumber={i+12} synth={this.synth} octave={j} />
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
