import React from 'react';
import { Header, Popup } from 'semantic-ui-react';
import DropDownMenu from './DropDownMenu'
const AfterLoggedHeader = (props)=>{
  return(
    <div>
      <Header as='h1' textAlign='center' color='brown'>
        <DropDownMenu/>
        Metro Pizza Management Center<br/>
        <button onClick={props.handleLogout} className="small ui button primary">Logout</button>
      </Header>
      <hr />
      <Header textAlign='center'>
        <div className="ui small buttons " >
          <Popup content="New Orders will display in this section" trigger={  <button className="ui button active teal"  value='viewOrders' onClick={props.handleToggleDisplay}>View Orders</button>}/>
          <div className="or"></div>
          <Popup content="Menu items can be created or deleted in this section" trigger={<button className="ui button teal" value='createItemForm' onClick={props.handleToggleDisplay}>Create Items</button>}/>
        </div>
      </Header>
    </div>
  )
}
export default AfterLoggedHeader;
