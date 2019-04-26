import React, {Component } from 'react';
import AdminLogin from '../components/AdminLogin';
import CreateMenuItems from '../components/CreateMenuItems';
import ManageItems from '../components/ManageItems';
import {Header} from 'semantic-ui-react';
import AfterLoggedHeader from '../components/AfterLoggedHeader';

class LoginContainer extends Component{
  constructor(){
    super()
    this.state ={
      isLogin: false,
      usernameInput: '',
      passwordInput: '',
      item_name: '',
      item_description: '',
      item_price: 0,
      img_url: '',
      user_id: 0,
      toggleCreateItem: false
    }
  }

  handleInputLogin = (ev)=>{
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleLoginSubmit = (ev)=>{
    ev.preventDefault()
    fetch('http://localhost:3000/api/v1/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ user: {username: this.state.usernameInput,password: this.state.passwordInput} })
      })
      .then(resp => resp.json())
      .then(json =>{
        if(json.jwt){
          this.setState({
            isLogin: true,
            user_id: json.user.id
          })
        }
        else{
          alert('Incorrect username or password')
        }
      })}

  handleLogout = ()=>{
    this.setState({
      isLogin: false
    })
  }

  handleMenuItemsInput =(ev)=>{
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleCreateMenuItems =(ev)=>{
    ev.preventDefault()
    const items ={
      name: this.state.item_name,
      description: this.state.item_description,
      price: this.state.item_price,
      img_url: this.state.img_url,
      user_id: this.state.user_id,
      category: ev.target.selectCategory.value
    }
    fetch("http://localhost:3000/api/v1/menu_items",{
      method: 'POST',
      headers:{'Content-Type': 'application/json',  Accept: 'application/json' },
      body: JSON.stringify({menu_item: items})
    })
  }

  handleToggleDisplay =(ev)=>{
    if(ev.target.value === 'createItemForm'){
      this.setState({
        toggleCreateItem: true
      })
    }
    else if(ev.target.value === 'viewOrders'){
      this.setState({
        toggleCreateItem: false
      })
    }
  }

  render(){
    if(this.state.isLogin){
      if(this.state.toggleCreateItem){
        return(
          <div>
            <AfterLoggedHeader handleLogout={this.handleLogout} handleToggleDisplay={this.handleToggleDisplay}/>
            <CreateMenuItems handleMenuItemsInput={this.handleMenuItemsInput} handleCreateMenuItems={this.handleCreateMenuItems}/><hr/>
            <ManageItems />
          </div>
        )
      }else{
        return(
          <div>
            <AfterLoggedHeader handleLogout={this.handleLogout} handleToggleDisplay={this.handleToggleDisplay}/>
          </div>
        )
      }}
    else{
      return (
        <div>
          <Header as='h1' textAlign='center' color='brown'>
            <strong>Elf Pizza Management Center</strong>
          </Header>  <hr />
          <AdminLogin handleLoginSubmit={this.handleLoginSubmit} handleInputLogin={this.handleInputLogin}/>
        </div>
      )
    }
  }}

export default LoginContainer;
