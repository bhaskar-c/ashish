import React, { Component } from 'react'

//matra
const taalMatras = {"Teental": 16, "Roopak": 7, "Choutaal": 12, "Ektaal":12, "Jhaptaal":10, "Keherwa":8, "Dadra": 6 }



export default class TaalTable extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {taalName: this.props.taalName, transcript: this.props.transcript}
  }
  
  
  renderTableRows(){
    let rows = [];
    let matras = taalMatras[this.state.taalName]
    let outArrayLength = this.state.transcript[this.state.taalName].length
    let numberOfRows =  Math.floor(outArrayLength /  matras) + 1
     console.log(numberOfRows)
    for (var row = 0; row < numberOfRows; row++){
      
      let rowID = `row${row}`
      let cell = []
      for (var col = 0; col < matras; col++){
        let cellID = `cell${row}-${col}`
        let itemIndex = (row * matras) + col
        var cellContent = ""
        if (itemIndex < outArrayLength) {
          cellContent =  this.state.transcript[this.state.taalName][itemIndex]
          }
        cell.push(<td class="tcell" key={cellID} id={cellID}>{cellContent}</td>)
      }
      rows.push(<tr>{cell}</tr>)
    }
     console.log(rows)
     return rows;
    }
  
 
  render(){
     return(
      <div className="container">
        <h2>{this.state.taalName}</h2>
        <div className="row">
          <div className="col s12 board">
            <table id="simple-board">
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
