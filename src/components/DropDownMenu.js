import React from 'react';
import {Dropdown, Button, Icon} from 'semantic-ui-react';

const DropDownMenu =(props)=>{
  return(
  <div id='menuIcon'>
      <Dropdown icon=<Icon  name='bars' size='large' ></Icon> >
        <Dropdown.Menu id="dropdown_background">
          <Button.Group vertical>
            <Button ><a href="https://metro-pizza.herokuapp.com/" target="_blank" rel="noopener noreferrer">Visit Pizza Order Site</a></Button>
          </Button.Group><hr/>
          <a href="https://github.com/YongLiang24" target="_blank" rel="noopener noreferrer">
            <Icon name="github" size='large' link/></a>
          <a href="https://www.linkedin.com/in/yongliang24/" target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" size='large' link/></a>
        </Dropdown.Menu>
      </Dropdown>
  </div>
  )
}
export default DropDownMenu;
