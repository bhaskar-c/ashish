import React from "react";
import ReactDOM from "react-dom";
import Dropdown from "react-dropdown";


import Keyboard from "./Keyboard";
import BottomSection from "./BottomSection";
import TaalTable from "./TaalTable";
import Synth from "../audio/synth";
import InitMIDI from "./../audio/midi";


window.onorientationchange = function () {
  var orientation = window.orientation;
  switch (orientation) {
    case 0:
    case 90:
    case -90:
      window.location.reload();
      break;
  }
};

var keyBinding = { 
		9:31, 192:32, 81:33, 65:34, 87:35, 83:36, 69:37, 68:38, 82:39, 70:40, 71:41, 89:42, 72:43, 85:44, 74:45, 81:46, 65:47, 76:48, 80:49, 186:50, 219:51, 
222:52, 221:53, 220:54
}
    
var numberOfOctaveToStartWithOctaveMapping = { 5: 2, 4: 3, 3: 3, 2: 4, 1: 4 };
var widthOfOneKey = 80;
var screenRealEstateAvailable = window.screen.width;
var numberOfkeys = 84;


export default class OverallStructure extends React.Component {
  
  constructor(props) {
    super(props);
    var synth = new Synth();
    this.noteEventUIUpdater = this.noteEventUIUpdater.bind(this);
    InitMIDI(synth, this.noteEventUIUpdater); // async call so it returns undefined until resolved
    this.state = {
      saOffset: 1, //sa coresponds to note C  // nt implemented further
      synth: synth,
      screenHeight: 0,
      screenWidth: 0,
      selectedNoteDurationIndex: 0,
      selectedMode: "Alaap",
      transcript: [],
    };
    this.modes = ["Alaap", "Teental", "Choutaal", "Roopak", "Choutaal", "Ektaal", "Jhaptaal", "Keherwa", "Dadra", ];
    this.topSection = null;
    this.bottomSection = null;
    this.addOnKeyDownListener();
    this.addOnKeyUpListener();
    this.noteEventUIUpdater = this.noteEventUIUpdater.bind(this);
  }

  getCurrentMode(){
    return this.state.selectedMode;
  }


  onNoteDurationButtonClicked(e) {
    var currentDurationButton = document.getElementById("ndb" + this.state.selectedNoteDurationIndex);
    currentDurationButton.classList.remove("note-duration-buttons-selected");
    currentDurationButton.classList.add("note-duration-buttons");
    e.target.classList.remove("note-duration-buttons");
    e.target.classList.add("note-duration-buttons-selected");
    this.state.selectedNoteDurationIndex = parseInt(
      e.target.getAttribute("data-index")
    );
  }

  renderNoteDurationsButtonsTable() {
    var noteDurations = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",];
    var noteDurationsButtons = [];
    var noteButtonDimension =
      Math.floor((this.state.screenHeight * 3) / 50) + "px";
    var buttonStyle = { width: noteButtonDimension,  height: noteButtonDimension,  };
    var tdStyleLeft = { paddingBottom: "5px", paddingRight: "3px", width: noteButtonDimension,  height: noteButtonDimension, };
    var tdStyleRight = { paddingBottom: "5px", paddingLeft: "3px", width: noteButtonDimension,  height: noteButtonDimension, };
    var tableRows = [];
    for (var i = 0; i < noteDurations.length; i += 2) {
      var klass1, klass2;
      i == this.state.selectedNoteDurationIndex
        ? (klass1 = "note-duration-buttons-selected")
        : (klass1 = "note-duration-buttons");
      i + 1 == this.state.selectedNoteDurationIndex
        ? (klass2 = "note-duration-buttons-selected")
        : (klass2 = "note-duration-buttons");
      tableRows.push(
        <tr style={{}}>
          <td style={tdStyleLeft}>
            <button className={klass1} style={buttonStyle} onClick={this.onNoteDurationButtonClicked.bind(this)} id={"ndb" + i} data-index={i} >
              {noteDurations[i]}
            </button>
          </td>
          <td style={tdStyleRight}>
            <button className={klass2} style={buttonStyle} onClick={this.onNoteDurationButtonClicked.bind(this)} id={"ndb" + (i + 1)} data-index={i + 1}>
              {noteDurations[i + 1]}
            </button>
          </td>
        </tr>
      );
    }
    return tableRows;
  }

  componentWillMount() {
    this.setState({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
    });
  }


  addOnKeyDownListener() {
    var self = this;
    document.onkeydown = function (e) {
      e = e || window.event;
      //console.log(e.keyCode);
      var noteNumber = keyBinding[e.keyCode];
      var velocity = 0.5;
      if (noteNumber) {
        self.state.synth.press(noteNumber, velocity);
        self.noteEventUIUpdater(noteNumber, velocity);
      }
    };
  }

  addOnKeyUpListener() {
    var self = this;
    document.onkeyup = function (e) {
      e = e || window.event;
      var noteNumber = keyBinding[e.keyCode];
      var velocity = 0.5;
      if (noteNumber) {
        self.state.synth.release(noteNumber);
      }
    };
  }

  onPlayButtonClicked(e) {
    var icon = document.getElementById("play");
    this.state.isPlaying = !this.state.isPlaying;
    if (this.tanpura.isPlaying) {
      icon.classList.add("active");
      // play here
    }
    if (!this.tanpura.isPlaying) {
      icon.classList.remove("active");
      // stop playing here
    }
    return false;
  }

  renderAllTaalTables(transcript) {
    let tables = [];
    for (var i = 0; i < transcript.length; i++) {
      var taalName = Object.keys(transcript[i])[0];
      tables.push(
        <TaalTable taalName={taalName} transcript={transcript[i]} />
      );
    }
    return tables;
  }

  noteEventUIUpdater(noteNumber, velocity) {
    //console.log(this.state.transcript);      
     if (this.state.transcript.length == 0){
       let obj = {};
       obj[this.state.selectedMode] = [];
      this.state.transcript.push(obj);
        
        }
      let temp_arr = this.state.transcript[this.state.transcript.length - 1][this.state.selectedMode];
      let numberOfItemsToPushInThisArray = this.state.selectedNoteDurationIndex + 1;
      let selectedNoteDuration = this.state.selectedNoteDurationIndex + 1;
      let ragSpecificPitchBendInfo = 0.0; //todo left here as a placeholder
      let approach = 0.0; //todo left here as a placeholder
      let articulation = 1; // 1 for normal, 0 for rest and 2 for continuation
      if (noteNumber == "-") {  // continued note
        articulation = 2;  }
      if (noteNumber == "X") {  // rest note
        articulation = 0;  }                 
      let lastArrayInTempArray = temp_arr[temp_arr.length - 1];
      if (this.state.selectedMode == "Alaap") { selectedNoteDuration = 1;  }
      let isThisFirstNoteOfTheMode = typeof lastArrayInTempArray == "undefined";
      if (this.state.selectedMode == "Alaap"){
            //push every note to a new array as noteduration is taken as 1
        temp_arr.push([[noteNumber, velocity, selectedNoteDuration, ragSpecificPitchBendInfo,approach, articulation ]]);
        }
      else if ( !isThisFirstNoteOfTheMode && lastArrayInTempArray.length < numberOfItemsToPushInThisArray ) {
        // we have space for more notes here so push this note in there
        temp_arr[temp_arr.length - 1].push([noteNumber, velocity, selectedNoteDuration, ragSpecificPitchBendInfo,approach, articulation ]);
      } else {
        //push to a new array if first note or if last array exhausted
        temp_arr.push([[noteNumber, velocity, selectedNoteDuration, ragSpecificPitchBendInfo,approach, articulation ]]);
      }

      var temp2 = this.state.transcript;
      temp2[this.state.transcript.length - 1][this.state.selectedMode] = temp_arr;
      this.setState({ transcript: temp2 });
      
    
  }

  onModeChange(e) {
    this.setState({ selectedMode: e.value });
    let temp = this.state.transcript;
    let obj = {};
    obj[e.value] = []; // bug if same taal mode is selected twice the second taal data will overwrite the previous data
    temp.push(obj);
    this.setState({ transcript: temp });
  }
  
  on4ButtonsPressed(e) {
    console.log(e);
  }

  renderFourButtons() {
    var fourButtonDimension =
      Math.floor((this.state.screenHeight * 3) / 45) + "px";
    var buttonStyle = {
      width: fourButtonDimension,
      height: fourButtonDimension,
    };
    var tdStyleLeft = {
      paddingRight: "2px",
      width: fourButtonDimension,
      height: fourButtonDimension,
    };
    var tdStyleRight = {
      paddingLeft: "2px",
      width: fourButtonDimension,
      height: fourButtonDimension,
    };
    var fourButtons = [];
    fourButtons.push(
      <tr>
        <td style={tdStyleLeft}>
          <button
            className="note-duration-buttons"
            style={buttonStyle}
            onClick={this.on4ButtonsPressed.bind(this)}
          >
            {" "}
            Del{" "}
          </button>
        </td>
        <td style={tdStyleRight}>
          <button
            className="note-duration-buttons"
            style={buttonStyle}
            onClick={this.on4ButtonsPressed.bind(this)}
          >
            {" "}
            B{" "}
          </button>
        </td>
      </tr>
    );
    fourButtons.push(
      <tr>
        <td style={tdStyleLeft}>
          <button
            className="note-duration-buttons"
            style={buttonStyle}
            onClick={this.on4ButtonsPressed.bind(this)}
          >
            {" "}
            C{" "}
          </button>
        </td>
        <td style={tdStyleRight}>
          <button
            className="note-duration-buttons"
            style={buttonStyle}
            onClick={this.on4ButtonsPressed.bind(this)}
          >
            R
          </button>
        </td>
      </tr>
    );
    return fourButtons;
  }

  render() {
    var transcript = this.state.transcript;
    var screenHeight = this.state.screenHeight;
    var topHeight = Math.floor((screenHeight * 2) / 3);
    var notationHeight = Math.floor(topHeight - 40) + "px";
    var leftWidth = Math.floor((this.state.screenWidth * 1) / 12) + "px";
    var centerWidth =
      Math.floor((this.state.screenWidth * 10) / 12 - 50) + "px";
    var rightWidth = leftWidth;
    var keyBoardHeight = Math.floor(screenHeight / 3) - 55; // 55px reserved for bottom buttons section below keyboard
    var setVolume = this.setVolume;
    return (
      <div>
        <div class="topSection" style={{ height: topHeight + "px" }}>
          <div class="left-section" style={{ width: leftWidth }}>
            <span class="title">Note Durations</span>
            <table>
              <tbody>{this.renderNoteDurationsButtonsTable()}</tbody>
            </table>
            <div class="horizontal-line"></div>
            <table style={{ fontSize: "80%" }}>
              {this.renderFourButtons()}
            </table>
          </div>
          <div class="center-section" style={{ width: centerWidth }}>
            <span class="title">Select Mode</span>
            <Dropdown
              title="Select Mode"
              options={this.modes}
              onChange={this.onModeChange.bind(this)}
              value={this.modes[0]}
              placeholder="Select mode"
            />
            <div id="notation" style={{ height: notationHeight, width: centerWidth, padding: "10px" }}>
              {this.renderAllTaalTables(transcript)}
            </div>
          </div>
          <div class="right-section" style={{ width: rightWidth }}>
            <button
              onClick={this.onPlayButtonClicked.bind(this)}
              title="play- pause"
              id="play"
              class="button -salmon center"
            >
              Play/Stop
            </button>
            <button id="midi-btn" class="button -salmon center">
              MIDI Devices
            </button>
          </div>
        </div>
        <div id="keyboardContainer" style={{ height: keyBoardHeight + "px" }}>
          <Keyboard
            height={keyBoardHeight}
            saOffset={this.state.saOffset}
            synth={this.state.synth}
            midi={this.state.midi}
            noteEventUIUpdater={this.noteEventUIUpdater}
          />
        </div>
        <div style={{ height: "55px" }}>
            <BottomSection parent = {this}  />
        </div>
      </div>
    );
  }
}
