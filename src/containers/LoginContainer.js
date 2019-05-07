import React, {Component } from 'react';
import AdminLogin from '../components/AdminLogin';
import CreateMenuItems from '../components/CreateMenuItems';
import ManageItems from '../components/ManageItems';
import {Header, Tab, Icon} from 'semantic-ui-react';
import AfterLoggedHeader from '../components/AfterLoggedHeader';
import ManageOrders from '../components/ManageOrders';
import DropDownMenu from '../components/DropDownMenu';

const panes = [{ menuItem: {icon: 'users', content: 'User Account', key: 'users'},
              render:() => <Tab.Pane><p className='about_p'><strong>Demo Account</strong><br/><strong>Username:</strong> metro <br/><strong>Password:</strong> pizza</p></Tab.Pane> },
              { menuItem:{icon: 'book', content: 'About Page', key: 'book' }, render: () => <Tab.Pane><p className='about_p'>Metro Pizza Management Center allows administrators<br/> to create or delete menu items for <a href="https://metro-pizza.herokuapp.com/" target="_blank" rel="noopener noreferrer">Metro Pizza</a> site,<br/> as well as receive online orders in real time and manage such orders.<br/> This site was built with React.js and Semantic UI for User Interface and Ruby on Rails as backend.</p></Tab.Pane> },
              { menuItem:{icon:'user', content:'About Me', key:'user'}, render: () => <Tab.Pane><p className='about_p'>Yong Liang is a Full stack web developer with<br/> a passion for software development and new technologies.<br/> With experience in Ruby on Rails, JavaScript,<br/> and React and a background in computer science.<br/><a href="https://github.com/YongLiang24" target="_blank" rel="noopener noreferrer">
                <Icon name="github" size='large' link/></a>
                <a href="https://www.linkedin.com/in/yongliang24/" target="_blank" rel="noopener noreferrer">
                  <Icon name="linkedin" size='large' link/></a> </p></Tab.Pane> },]

class LoginContainer extends Component{
  constructor(){
    super()
    this.state ={
      isLogin: false,
      usernameInput: 'metro',
      passwordInput: 'pizza',
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
      [ev.target.name]: ev.target.value.toLowerCase()
    })
  }

  handleLoginSubmit = (ev)=>{
    ev.preventDefault()
    fetch('https://backend-metro-pizza.herokuapp.com/api/v1/login',{
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
    fetch("https://backend-metro-pizza.herokuapp.com/api/v1/menu_items",{
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
            <ManageOrders />
          </div>
        )
      }}
    else{
      return (
        <div>
          <Header as='h1' textAlign='center' color='brown'>
            <DropDownMenu/>
            <strong>Metro Pizza Management Center</strong>
          </Header> <hr/>
          <AdminLogin handleLoginSubmit={this.handleLoginSubmit} handleInputLogin={this.handleInputLogin} loginUser={this.state.usernameInput} loginPassword={this.state.passwordInput}/>
          <Tab panes={panes} id="tab_menu"/>
          {/* <Header as='h3' textAlign='center' color='black'>
            <strong>Demo Account: Not case sensitive <hr/>Username: metro <hr/> Password: pizza<hr/></strong>
          </Header> */}
        </div>
      )
    }
  }}

export default LoginContainer;
