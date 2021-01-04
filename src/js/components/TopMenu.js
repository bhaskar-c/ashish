import React, { Component } from 'react'
import Menu from "./Menu";
import menuData from "./menuData";

class TopMenu extends Component {

  constructor(props) {
    super(props);
    this.parent =  props.parent;
  }

 

  render(){
    return(
        <div id="topMenu">
        <Menu menuData={menuData} />
      </div>
    );
  }
}

export default TopMenu;
