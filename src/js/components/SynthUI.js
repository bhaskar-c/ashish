import React from "react"
import ReactDOM from 'react-dom'
import Dropdown from 'react-dropdown'

import VerticalSlider from "./VerticalSlider"
import Keyboard   from "./Keyboard"
import Synth from '../audio/synth'
import InitMIDI from './../audio/midi'
//import noteNameFromNoteNumber from "../utils/utils"


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
    this.noteNameFromNoteNumber = this.noteNameFromNoteNumber.bind(this);
    this.noteEventUIUpdater = this.noteEventUIUpdater.bind(this);  
    InitMIDI(synth, this.noteEventUIUpdater, this.noteNameFromNoteNumber); // async call so it returns undefined until resolved
    this.state = {'synth': synth, 'enableKeyBoard': true, effect:"normal", startWithOctave:startWithOctave, numberOfOctaves:numberOfOctaves, 'is_playing': false, screenHeight:0, screenWidth:0, selectedNoteDurationIndex: 3, selectedMode: "Alaap", transcript:""};
    this.modes = ["Alaap", "Teental", "Choutaal", "Roopak"]
    this.topSection = null;
    this.bottomSection = null;
    this.addOnKeyDownListener();
    this.addOnKeyUpListener();
    this.noteEventUIUpdater = this.noteEventUIUpdater.bind(this)

  }
  
  onNoteDurationButtonClicked(e){
    var currentDurationButton = document.getElementById("ndb"+this.state.selectedNoteDurationIndex);
    currentDurationButton.classList.remove('note-duration-buttons-selected');
    currentDurationButton.classList.add('note-duration-buttons');
    e.target.classList.remove('note-duration-buttons');
    e.target.classList.add('note-duration-buttons-selected');
    this.state.selectedNoteDurationIndex = parseInt(e.target.getAttribute("data-index"));
  }
  


  renderNoteDurationsButtonsTable(){
    var noteDurations = ["1", "2", "3", "4", "5", "6", "7",  "8", "9", "10", "11", "12"]
    var noteDurationsButtons = []
    var noteButtonDimension = Math.floor(this.state.screenHeight*3/50)+ "px"; 
    var buttonStyle = { width:noteButtonDimension, height:noteButtonDimension};
    var tdStyleLeft = {paddingBottom: "5px", paddingRight:"3px", width:noteButtonDimension, height:noteButtonDimension,}
    var tdStyleRight = {paddingBottom: "5px", paddingLeft:"3px", width:noteButtonDimension, height:noteButtonDimension,}
    var tableRows = [];
    for (var i = 0; i < noteDurations.length; i+=2) {
     var klass1, klass2;
     i == this.state.selectedNoteDurationIndex ? klass1 ="note-duration-buttons-selected": klass1 ="note-duration-buttons"
     i+1 == this.state.selectedNoteDurationIndex ? klass2 ="note-duration-buttons-selected": klass2 ="note-duration-buttons"
    tableRows.push(<tr style={{}}> 
                <td style={tdStyleLeft}><button className={klass1} style={buttonStyle} onClick={this.onNoteDurationButtonClicked.bind(this)} id= {"ndb"+i} data-index={i}>{noteDurations[i]}</button></td>             
                <td style={tdStyleRight}><button className={klass2} style={buttonStyle} onClick={this.onNoteDurationButtonClicked.bind(this)} id={"ndb"+(i+1)} data-index={i+1}>{noteDurations[i+1]}</button></td>
            </tr>);
    }
    return tableRows;
  }
    
  noteEventUIUpdater(noteName){
      console.log(noteName)
      var new_val = this.state.transcript + " " + noteName;  
      this.setState({transcript: new_val})
  }

   

  componentWillMount(){
          this.setState({screenHeight: window.innerHeight, screenWidth:window.innerWidth});
      }


	onEffectChange(id){
	   this.setState({effect: id});
	   this.state.synth.changeEffect(id);
	   //this.setState({synth: this.state.synth});
	}


  noteNameFromNoteNumber(noteNumber){
    var octave =  Math.floor(noteNumber / 12) - 1;
    var noteNameWithoutOctave = ["S", "r", "R", "g", "G", "M", "m", "P", "d", "D", "n", "N"][noteNumber%12];
    var octaveSymbol =  ["'''","''", "'","","'","''", "'''"][octave]
    if (octave < 3){return octaveSymbol+ noteNameWithoutOctave}
    else{return noteNameWithoutOctave + octaveSymbol}
    }


	addOnKeyDownListener(){
		var self = this
		document.onkeydown = function(e){
      e = e || window.event;
			var noteNumber = keyBinding[e.keyCode]
			var velocity = 0.5
			if(noteNumber){
				self.state.synth.press(noteNumber, velocity)
        var noteName = self.noteNameFromNoteNumber(noteNumber)
        self.noteEventUIUpdater(noteName)
        
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

 onPlayButtonClicked(e){
	 var icon = document.getElementById('play');
	 this.state.isPlaying = !this.state.isPlaying
	 if(this.tanpura.isPlaying){
		 icon.classList.add("active");
		 // play here 
		 }
	 if(!this.tanpura.isPlaying){
		icon.classList.remove("active"); 
		// stop playing here 
		
		}
	 return false;
	 }	


onModeChange(e){
 this.selectedMode = e.value;
  
}
on4ButtonsPressed(e){
  console.log(e);
  
  }

renderFourButtons(){
  var fourButtonDimension = Math.floor(this.state.screenHeight*3/45)+ "px"; 
    var buttonStyle = { width:fourButtonDimension, height:fourButtonDimension};
    var tdStyleLeft = { paddingRight:"2px", width:fourButtonDimension, height:fourButtonDimension,}
    var tdStyleRight = { paddingLeft:"2px", width:fourButtonDimension, height:fourButtonDimension,}
    var fourButtons = []
    fourButtons.push(
                 <tr>
                  <td style={tdStyleLeft}><button className="note-duration-buttons" style={buttonStyle} onClick={this.on4ButtonsPressed.bind(this)}> Del </button></td>             
                  <td style={tdStyleRight}><button className="note-duration-buttons" style={buttonStyle} onClick={this.on4ButtonsPressed.bind(this)}> B  </button></td>
                  </tr>
    )  
    fourButtons.push(              <tr>
                  <td style={tdStyleLeft}><button className="note-duration-buttons" style={buttonStyle} onClick={this.on4ButtonsPressed.bind(this)}> C </button></td>             
                  <td style={tdStyleRight}><button className="note-duration-buttons" style={buttonStyle} onClick={this.on4ButtonsPressed.bind(this)}>R</button></td>
                  </tr>)
return fourButtons;

}

  render() {
    var screenHeight = this.state.screenHeight;
    var topHeight = Math.floor(screenHeight*3/4); 
    var notationHeight = Math.floor(topHeight -40) + "px";
    var leftWidth = Math.floor((this.state.screenWidth*1/12)) + "px";
    var centerWidth = Math.floor((this.state.screenWidth*10/12)- 50) + "px";
    var rightWidth   =  leftWidth;
    var bottomHeight = Math.floor(screenHeight/4);
    var setVolume =   this.setVolume;    
    return (
      <div>
    <div class="topSection" style={{height: topHeight+"px"}}>  
              <div class="left-section" style={{width: leftWidth}}> 
              <span class='title'>Note Durations</span>
              <table>
                <tbody>
                  {this.renderNoteDurationsButtonsTable()}
               </tbody>
              </table>
              <div class="horizontal-line"></div>
               <table style={{fontSize:"80%"}}>
                  {this.renderFourButtons()}
                </table>
              </div>
              <div class="center-section" style={{width: centerWidth}}> 
                  <span class='title'>Select Mode</span>
                  <Dropdown title= "Select Mode" options={this.modes} onChange={this.onModeChange} value={this.modes[0]} placeholder="Select mode" />
                  <div id="notation" style={{height: notationHeight, width:centerWidth}}>
                    {this.state.transcript}
                  </div>
                
              </div>
              <div class="right-section" style={{width: rightWidth}}> 
                <button onClick={this.onPlayButtonClicked.bind(this)} title="play- pause" id="play" class="button -salmon center">Play/Stop</button>
                <button id="midi-btn" class="button -salmon center">MIDI Devices</button>
              </div>          
                
    </div>
    <div class="bottomSection" style={{height: bottomHeight+"px"}}>  
    <div id = "synthContainer" >
            <Keyboard height={bottomHeight} startWithOctave={this.state.startWithOctave} numberOfOctaves={this.state.numberOfOctaves} synth={this.state.synth}  midi={this.state.midi} noteEventUIUpdater={this.noteEventUIUpdater}  />
          </div>    
        </div>
    </div>
    );
  }
}
