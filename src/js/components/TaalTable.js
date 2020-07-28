  import React, { Component } from 'react'

//matra
const taalMatras = {"Alaap":30, "Teental": 16, "Roopak": 7, "Choutaal": 12, "Ektaal":12, "Jhaptaal":10, "Keherwa":8, "Dadra": 6 }



export default class TaalTable extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {taalName: this.props.taalName, transcript: this.props.transcript}
  }


  getNoteNameWithOctave(noteNumber){
    if( noteNumber == "-") {return "-"}
    if( noteNumber == "X") {return "X"}
    let octave = Math.floor(noteNumber / 12);
    let lookup = {'notes': ["S", "r", "R", "g", "G", "M", "m", "P", "d", "D", "n", "N"],  'octavesymbols': ["'''","''", "'","","'","''", "'''"]}
    var noteNameWithoutOctave = lookup['notes'][noteNumber%12]
    var octaveSymbol = lookup['octavesymbols'][octave]
    if (octave < 3){return octaveSymbol+ noteNameWithoutOctave}
    else{return noteNameWithoutOctave + octaveSymbol}
    
  }
  
 
 onCellEdited(e){
   console.log(e);
   var sel = document.getSelection()
        
    //nd = sel.anchorNode,
    //text = nd.textContent.slice(0, sel.focusOffset);

    //var line=text.split("\n").length;
    //var col=text.split("\n").pop().length;
    alert(sel)
   }
 
 
 onPasteContent(){
   alert("Not allowed");
   }
  
  renderTableRows(){
    let rows = [];
    let matras = taalMatras[this.state.taalName]
    let outArrayLength = this.state.transcript[this.state.taalName].length
    let numberOfRows =  Math.floor(outArrayLength /  matras) + 1
    for (var row = 0; row < numberOfRows; row++){
      
      let rowID = `row${row}`
      let cell = []
      for (var col = 0; col < matras; col++){
        let cellID = `cell${row}-${col}`
        let itemIndex = (row * matras) + col
        var cellContent = ""
        if (itemIndex < outArrayLength) {
          let cellDataComesFrom = this.state.transcript[this.state.taalName][itemIndex]
          for (var c = 0; c < cellDataComesFrom.length; c++){
            let noteNumber =  cellDataComesFrom[c][0]
            cellContent += " "+ this.getNoteNameWithOctave(noteNumber)
            }
          }
        cell.push(<td className={`${this.state.taalName}_cell`} key={cellID} id={cellID} >{cellContent}</td>)
      }
      rows.push(<tr>{cell}</tr>)
    }
     return rows;
    }
  
 
  render(){
    let className= `taal_table ${this.state.taalName}_table`

     return(
      <div className="container">
        <h2>{this.state.taalName}</h2>
        <div className="row">
          <div className="col s12 board">
            <table id={this.state.taalName} className={className} onInput={this.onCellEdited} onPaste={this.onPasteContent} contentEditable>
               <tbody>
                 {this.renderTableRows()}
               </tbody>
             </table>
          </div>
        </div>
      </div>
    )
  }
}
