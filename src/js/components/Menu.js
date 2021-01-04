import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'



class Menu extends Component {

  constructor(props) {
    super(props);
    this.parent =  props.parent;
    this.onMenuItemClicked = this.onMenuItemClicked.bind(this);


    this.state = {
           activeMenuIndex: -1,
      }
  }

    handleClickOutside = () => {
      this.setState({ activeMenuIndex: -1 });
    }


   
   onMenuItemClicked(index)    {
    
    this.setState({ activeMenuIndex: index });
  }

  render() {
    let selectedMenuIndex = this.state.activeMenuIndex;
    var subMenuHeight = 0;
    {selectedMenuIndex > -1 ?
     subMenuHeight = this.props.menuData[this.state.activeMenuIndex].subMenu.length  * 15 : 0 }
    
    var self = this;
    var left = this.state.activeMenuIndex * 80;
    return (
      <div className='menu-container below'>
        <ul className="menu" onMouseLeave={this.handleMouseLeaveMenu}>
          {this.props.menuData.map(function(menu, index) {
            var className = 'menu-item';
            if (index === self.state.activeMenuIndex) {
              className += ' active';
            }

            return (
              <li className={className} key={index} onClick={this.onMenuItemClicked.bind(null, index)} >
                {menu.name}
              </li>
            );
          }, this)}
        </ul>
          {selectedMenuIndex > -1 ?
          <ul className="sub-menu" style={{height:subMenuHeight, left:left}}>
            {this.props.menuData[this.state.activeMenuIndex].subMenu.map((function(subMenu, index){
              return (
                <li className="sub-menu-item" key={index}>{subMenu}</li>
              );
            }))}
          </ul> : <span/> }
        
      </div>
    );
  }
}

export default onClickOutside(Menu);
