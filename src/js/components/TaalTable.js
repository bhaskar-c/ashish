import React, { Component } from 'react'

export default class TaalTable extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {matras: this.props.matras}
  }
  render(){
    let rows = [];
    for (var i = 0; i < 1; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < this.state.matras; idx++){
        let cellID = `cell${i}-${idx}`
        cell.push(<td class="tcell" key={cellID} id={cellID}>SA</td>)
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return(
      <div className="container">
        <h2>Teental</h2>
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
