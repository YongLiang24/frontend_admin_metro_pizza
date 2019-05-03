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
      toggleInterval: ''
    }
  }
  componentDidMount(){
    fetch('http://localhost:3000/api/v1/orders')
    .then(resp => resp.json())
    .then(json=>{
      // console.log(json[0].id)
      const tempOrder = []
      const tempId = []
      this.setState({allOrderLists: json})
      this.state.allOrderLists.reverse()
      this.state.allOrderLists.map((order, index)=>{
         tempOrder.push(order.order_lists.toString().replace(/=>/g, ": ").replace(/{/g, "").replace(/}/g, "").replace(/,/g, " || ").replace(/"/g, ""))
         tempId.push(json[index].id)
      })
      this.setState({formattedOrderLists: tempOrder, orderListIds: tempId})

      console.log("order ids", this.state.orderListIds)
    })


  }

  handleUpdateOrderList = ()=>{

    fetch('http://localhost:3000/api/v1/orders')
    .then(resp => resp.json())
    .then(json=>{
      console.log(json[0].id)
      const tempOrder = []
      const tempId = []
      this.setState({allOrderLists: json})
      this.state.allOrderLists.reverse()
      this.state.allOrderLists.map((order, index)=>{
         tempOrder.push(order.order_lists.toString().replace(/=>/g, ": ").replace(/{/g, "").replace(/}/g, "").replace(/,/g, " || ").replace(/"/g, ""))
         tempId.push(json[index].id)
      })
      this.setState({formattedOrderLists: tempOrder, orderListIds: tempId})
    })
  }

  handleButtonDisable = (ev)=>{
    console.log(ev.target.className)
    ev.target.disabled = true
    ev.target.className = 'secondary ui  button'
  }

  handleDeleteOrder = (ev)=>{
    console.log(ev.target.name)
    fetch(`http://localhost:3000/api/v1/orders/${ev.target.name}`,{
      method: 'DELETE'})
    setTimeout(this.handleUpdateOrderList, 2000)
  }

  handleLiveUpdate = ()=>{

    this.setState({ toggleLiveUpdate: !this.state.toggleLiveUpdate })
    if(this.state.toggleLiveUpdate){
      this.setState({liveUpdateText: 'Off'})
      clearInterval(this.state.toggleInterval)
    }
    else{
      this.setState({liveUpdateText: 'On'})
      this.state.toggleInterval = setInterval(this.handleUpdateOrderList, 2000)
    }
  }

  render(){
    return(
      <div id="order_div">
        <Button toggle  active={this.state.toggleLiveUpdate} onClick={this.handleLiveUpdate}>
          Live Update {this.state.liveUpdateText}</Button> <br/><br/>
        <Card.Group centered>
          {
            this.state.formattedOrderLists.map((order, index)=>{
              return   <Card fluid id='order_card' key={index} >
                <Card.Content>
                  <Card.Header>Order#: {index}</Card.Header>
                  <Card.Description id="order_text"><strong>{order}</strong></Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button.Group fluid id="order_button">
                    <Button positive  onClick={this.handleButtonDisable}>Confirm Order</Button>
                    <Button.Or />
                    <Button onDoubleClick={this.handleDeleteOrder} name={this.state.orderListIds[index]}>Delete Order (Double Click)</Button>
                  </Button.Group>
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
