import React from "react"
import ReactDOM from 'react-dom'
import Dropdown from 'react-dropdown'

import VerticalSlider from "./VerticalSlider"
import Keyboard   from "./Keyboard"
import Synth from '../audio/synth'
import InitMIDI from './../audio/midi'

window.onorientationchange = function() { 
        var orientation = window.orientation; 
            switch(orientation) { 
                case 0:
                case 90:
                case -90: window.location.reload(); 
                break; } 
 };


var keyBinding = { 
		90: 33, 88: 35, 67: 36, 86: 38, 66: 40, 78: 41, 77:43, 188:45, 190:	47, 191:48,
	    65: 32, 83:34, 70:37, 71:39, 74:42, 75:44, 76:46, 222:49 ,
	    81:45, 87: 47, 69:48, 82:50, 84:52, 89:53, 85:55, 73:57, 79:59, 80:60, 219:62, 221:64,
		49:44, 50:46, 52:49, 53:51, 55:54, 56:56, 57:58, 189:61, 187:63}

var numberOfOctaveToStartWithOctaveMapping = {5:2, 4:3, 3:3, 2:4, 1: 4 }
var widthOfOneKey = 80
var screenRealEstateAvailable = window.screen.width
var numberOfkeys = 84
var numberOfOctaves = 7
var startWithOctave = 0

export default class SynthUI extends React.Component {


  constructor(props) {
    super(props);
    var synth = new Synth();
    InitMIDI(synth); // async call so it returns undefined until resolved
    this.state = {'synth': synth, 'enableKeyBoard': true, effect:"normal", startWithOctave:startWithOctave, numberOfOctaves:numberOfOctaves};
    this.addOnKeyDownListener();
    this.addOnKeyUpListener();

  }


	onEffectChange(id){
	   this.setState({effect: id});
	   this.state.synth.changeEffect(id);
	   //this.setState({synth: this.state.synth});
	}


	addOnKeyDownListener(){
		var self = this
		document.onkeydown = function(e){
			e = e || window.event;
			var noteNumber = keyBinding[e.keyCode]
			var velocity = 0.5
			if(noteNumber){
				self.state.synth.press(noteNumber, velocity)
			}
			};
		}


	addOnKeyUpListener(){
		var self = this
		document.onkeyup = function(e){
			e = e || window.event;
			var noteNumber = keyBinding[e.keyCode]
			var velocity = 0.5
			if(noteNumber){
				self.state.synth.release(noteNumber)
			}
			};
		}


  render() {
	var setVolume =   this.setVolume;    
    return (
      <div>
      <div id = "synthContainer" >
      
        <Keyboard startWithOctave={this.state.startWithOctave} numberOfOctaves={this.state.numberOfOctaves} synth={this.state.synth}  midi={this.state.midi}/> </div>
        <div class="bottom">
        <button id="midi-btn" class="button -salmon center">MIDI Devices</button>
				<fieldset>
				  <input id="soft" onChange={this.onEffectChange.bind(this, 'soft')} class="radio-inline-input" type="radio" name="accessible-radio" value="soft" checked={this.state.effect === 'soft'}/>
				  <label class="radio-inline-label" for="soft">
					  soft
				  </label>
				  <input id="normal" onChange={this.onEffectChange.bind(this, 'normal')} class="radio-inline-input" type="radio" name="accessible-radio" value="normal" checked={this.state.effect === 'normal'} />
				  <label class="radio-inline-label" for="normal">
					  normal
				  </label>
				  </fieldset>
			  <div id="toast"></div>
        </div>
      </div>
    );
  }
}
