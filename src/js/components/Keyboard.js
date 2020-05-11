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
    this.maxHeight = props.height;
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
              <Key maxHeight={this.maxHeight} color="key_white" id={i+1} noteNumber={i +1 } note={ 'C' + j}  synth={this.synth} />
              <Key maxHeight={this.maxHeight} color="key_black" id={i+2} noteNumber={i +2} note= {'Db' + j } synth={this.synth} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} color="key_white" id={i+3} noteNumber={i +3} note= { 'D' + j} synth={this.synth} />
              <Key maxHeight={this.maxHeight} color="key_black" id={i+4} noteNumber={i +4} note={'Eb'} synth={this.synth} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} color="key_white" id={i+5} noteNumber={i +5} note={'E'+j} synth={this.synth} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} color="key_white" id={i+6} noteNumber={i+6} note={'F'+j} synth={this.synth} />
              <Key maxHeight={this.maxHeight} color="key_black" id={i+7} noteNumber={i+7} note={'Gb'+j} synth={this.synth}/>
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} color="key_white" id={i+8} noteNumber={i+8} note={'G'+j} synth={this.synth} />
              <Key maxHeight={this.maxHeight} color="key_black" id={i+9} noteNumber={i+9} note={'Ab'+j} synth={this.synth} />
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} color="key_white" id={i+10} noteNumber={i+10} note={'A'+j} synth={this.synth} />
              <Key maxHeight={this.maxHeight} color="key_black" id={i+11} noteNumber={i+11} note={'Bb'+j} synth={this.synth}/>
            </li>
            <li style={{width: keyWidth + 'px'}}>
              <Key maxHeight={this.maxHeight} color="key_white" id={i+12} noteNumber={i+12} note={'B'+j} synth={this.synth} />
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
