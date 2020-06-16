import React, { Component } from 'react'

  

class BottomSection extends Component {

  constructor(props) {
    super(props);
    this.parent =  props.parent;
    this.noteEventUIUpdater = props.noteEventUIUpdater;
    this.state = {}  ;
  }

  onButtonPressed(id) {
    if (id == "-" || id == "X") {
      this.parent.noteEventUIUpdater(id);
      return;
    }
    if (id == "," || id == ".") {
    if (this.parent.getCurrentMode() == "Alaap"){
         this.parent.noteEventUIUpdater(id);
       }  
    }
  }


  onCopyButtonPressed() {
    var str = document.getElementById('notation').innerHTML;
    str = str.replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/g,'');

    function listener(e) {
      e.clipboardData.setData("text/html", str);
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    alert("content copied. Now paste as HTML (ctrl+shift+v) in your word document" )
  }
  
  
  onPrintToPDFButtonPressed(){
    var contentToPrint = document.getElementById('notation').innerHTML;
    contentToPrint = contentToPrint.replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/g,''); // remove all html comments
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    mywindow.document.write(`<html><head><title>Notation</title>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(contentToPrint);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
  }
  
  
  

  render(){
    return(
        <div id="bottomSection">
          <button className="bottom-buttons" onClick={this.onButtonPressed.bind(this, ",")}> 
              <img src="img/comma.svg" className ="comma-img" /> 
          </button>
          <button className="bottom-buttons" onClick={this.onButtonPressed.bind(this, ".")}> 
              <img src="img/fullstop.svg" className ="fullstop-img"/> 
          </button>
          <button className="bottom-buttons" onClick={this.onButtonPressed.bind(this, "-")} title="continued note"> 
            <img src="img/continue.svg" className="continue-img" />
            </button>
          <button className="bottom-buttons" onClick={this.onButtonPressed.bind(this, "X")} title="rest/empty note"> 
            <img src="img/rest.svg" className="rest-img"/>
          </button>
          
          <button className="bottom-buttons" onClick={this.onCopyButtonPressed.bind(this)} title="copy to clipboard"> 
            <img src="img/copy.svg" className="copy-img"/>
          </button>


          <button className="bottom-buttons" onClick={this.onPrintToPDFButtonPressed.bind(this)} title="print to pdf"> 
            <img src="img/printtopdf.svg" className="copy-img"/>
          </button>
          
      </div>
    );
  }
}

export default BottomSection;
