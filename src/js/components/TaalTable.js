import React, { Component } from 'react'

//matra
const taalMatras = {"Teental": 13, "Roopak": 7, "Choutaal": 10}



export default class TaalTable extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {taalName: this.props.taalName, transcript: this.props.transcript}
  }
  
  
  render(){
    let rows = [];
    let matras = taalMatras[this.state.taalName]
    for (var i = 0; i < 1; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < matras; idx++){
        let cellID = `cell${i}-${idx}`
        cell.push(<td class="tcell" key={cellID} id={cellID}>{this.state.transcript[idx]}</td>)
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return(
      <div className="container">
        <h2>{this.state.taalName}</h2>
        <div className="row">
          <div className="col s12 board">
            <table id="simple-board">
               <tbody>
                 {rows}
               </tbody>
             </table>
          </div>
        </div>
      </div>
    )
  }
}
