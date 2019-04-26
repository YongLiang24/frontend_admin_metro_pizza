import React from 'react';
import { Header } from 'semantic-ui-react';
const AfterLoggedHeader = (props)=>{
  return(
    <div>
      <Header as='h1' textAlign='center' color='brown'>
        Elf Pizza Management Center<br/>
        <button onClick={props.handleLogout} className="small ui button primary">Logout</button>
      </Header>
      <hr />
      <Header textAlign='center'>
        <div className="ui small buttons " >
          <button className="ui button active teal"  value='viewOrders' onClick={props.handleToggleDisplay}>View Orders</button>
          <div className="or"></div>
          <button className="ui button teal" value='createItemForm' onClick={props.handleToggleDisplay}>Create Items</button>
        </div>
      </Header>
      <br/>
    </div>
  )
}
export default AfterLoggedHeader;
