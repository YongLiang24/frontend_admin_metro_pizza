import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
class ManageOrders extends Component{
  constructor(){
    super()
    this.state={
      allOrderLists: [],
      formattedOrderLists: [],
      buttonDisable: false,
      orderListIds: [],
      toggleLiveUpdate: false,
      liveUpdateText: 'Off',
      toggleInterval: '',
      customerNames: [],
      customerPhones: [],
      specialInstructions: [],
      totalPrices: [],
      orderTimes: []
    }
  }
  componentDidMount(){
    fetch('https://backend-metro-pizza.herokuapp.com/api/v1/orders')
    .then(resp => resp.json())
    .then(json=>{
      const tempOrder = [];
      const tempId = [];
      const tempName = [];
      const tempPhone = [];
      const tempTime =[];
      const tempInstruction = [];
      const tempPrice =[]
      this.setState({allOrderLists: json})
      this.state.allOrderLists.reverse()
      this.state.allOrderLists.map((order, index)=>{
          tempOrder.push(order.order_lists.toString().replace(/=>/g, ": ").replace(/{/g, "").replace(/}/g, "").replace(/,/g, " || ").replace(/"/g, ""));
         tempId.push(json[index].id);
         tempName.push(this.state.allOrderLists[index].Customer_Name);
         tempPhone.push(this.state.allOrderLists[index].Customer_Phone);
         tempTime.push(this.state.allOrderLists[index].Order_Time);
         tempInstruction.push(this.state.allOrderLists[index].Special_Instruction);
         tempPrice.push(this.state.allOrderLists[index].Total_Price);
         return null;
      })
      this.setState({
        formattedOrderLists: tempOrder,
        orderListIds: tempId,
        customerNames: tempName,
        customerPhones: tempPhone,
        orderTimes: tempTime,
        specialInstructions: tempInstruction,
        totalPrices: tempPrice
       })
    })
  }

  handleUpdateOrderList = ()=>{
    console.log("is living updating:")
    fetch('https://backend-metro-pizza.herokuapp.com/api/v1/orders')
    .then(resp => resp.json())
    .then(json=>{
      const tempOrder = [];
      const tempId = [];
      const tempName = [];
      const tempPhone = [];
      const tempTime =[];
      const tempInstruction = [];
      const tempPrice =[]
      this.setState({allOrderLists: json})
      this.state.allOrderLists.reverse()
      this.state.allOrderLists.map((order, index)=>{
          tempOrder.push(order.order_lists.toString().replace(/=>/g, ": ").replace(/{/g, "").replace(/}/g, "").replace(/,/g, " || ").replace(/"/g, ""));
         tempId.push(json[index].id);
         tempName.push(this.state.allOrderLists[index].Customer_Name);
         tempPhone.push(this.state.allOrderLists[index].Customer_Phone);
         tempTime.push(this.state.allOrderLists[index].Order_Time);
         tempInstruction.push(this.state.allOrderLists[index].Special_Instruction);
         tempPrice.push(this.state.allOrderLists[index].Total_Price);
         return null;
      })
      this.setState({
        formattedOrderLists: tempOrder,
        orderListIds: tempId,
        customerNames: tempName,
        customerPhones: tempPhone,
        orderTimes: tempTime,
        specialInstructions: tempInstruction,
        totalPrices: tempPrice
       })
    })
  }

  handleButtonDisable = (ev)=>{
    console.log(ev.target.className)
    ev.target.disabled = true
    ev.target.className = 'secondary ui  button'
  }

  handleDeleteOrder = (ev)=>{
    fetch(`https://backend-metro-pizza.herokuapp.com/api/v1/orders/${ev.target.name}`,{
      method: 'DELETE'})
    setTimeout(this.handleUpdateOrderList, 2000)
  }

  handleLiveUpdate = (ev)=>{
    this.setState({ toggleLiveUpdate: !this.state.toggleLiveUpdate })
    if(this.state.toggleLiveUpdate){
      this.setState({liveUpdateText: 'Off'})
      clearInterval(this.state.toggleInterval)
    }
    else{
      this.setState({liveUpdateText: 'On', toggleInterval: setInterval(this.handleUpdateOrderList, 2000)})
    }
  }

  render(){
    return(
      <div id="order_div">
        <Button toggle   active={this.state.toggleLiveUpdate} onClick={this.handleLiveUpdate}>
          Live Update {this.state.liveUpdateText}</Button> <br/><br/>
        <Card.Group centered>
          {
            this.state.formattedOrderLists.map((order, index)=>{
              return   <Card fluid id='order_card' key={index} >
                <Card.Content>
                  <Card.Header id='order_header'>Customer Name: {this.state.customerNames[index]} || Phone: {this.state.customerPhones[index]} || Time: {this.state.orderTimes[index]}</Card.Header>
                  <Card.Description id="order_text"><strong>Items: - {order}</strong></Card.Description><br/>
                  <Card.Description id="order_instruction">Notes: {this.state.specialInstructions[index]}<br/><br/>Total Cost: ${this.state.totalPrices[index]}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button.Group fluid id="order_button">
                    <Button positive  onClick={this.handleButtonDisable}>Confirm Order</Button>  <Button.Or />
                    <Button onDoubleClick={this.handleDeleteOrder} name={this.state.orderListIds[index]}>Delete Order (Double Click)</Button>  </Button.Group>
                </Card.Content>
              </Card>
            })
          }
        </Card.Group>
      </div>
    )
  }
}

export default ManageOrders;
