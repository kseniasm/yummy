import React, { Component} from 'react';
import {Responsive} from 'semantic-ui-react'
import MobileNavBar from './MobileNavBar';
import DesktopNavBar from './DesktopNavBar';



class NavBar extends Component {

  render() {
  
    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <MobileNavBar />
        </Responsive>


        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <DesktopNavBar />
        </Responsive>
      </div>
    );
  }
}


export default NavBar;
