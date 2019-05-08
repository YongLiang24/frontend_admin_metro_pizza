import React, {Component} from 'react';
import { Card, Button, Popup } from 'semantic-ui-react';
class ManageItems extends Component{
  constructor(){
    super()
    this.state ={
      displayItems: [],
      hideItems: true,
      filteredItems: []
    }
  }

  componentDidMount(){
    this.updateItemList()
  }

  updateItemList =()=>{
    fetch('https://backend-metro-pizza.herokuapp.com/api/v1/menu_items')
    .then(resp => resp.json())
    .then(json=>{
      this.setState({
        displayItems: json
      })
    })
  }

  updateAfterDelete =()=>{
    fetch('https://backend-metro-pizza.herokuapp.com/api/v1/menu_items')
    .then(resp => resp.json())
    .then(json=>{
      this.setState({
        filteredItems: json
      })
    })
  }

  handleDeleteItem = (ev)=>{
    let x = window.confirm("Are you sure you want to delete this?");
    if (x){
      fetch(`https://backend-metro-pizza.herokuapp.com/api/v1/menu_items/${ev.target.value}`,{  method: 'DELETE' })
      setTimeout(this.updateAfterDelete, 2000)
      return true;}
    else {return false;}
  }

  handleShowItemForm = (ev)=>{
    ev.preventDefault()
    this.updateItemList()
    switch (ev.target.filterCategories.value){

      case 'all':
        return this.setState({filteredItems: this.state.displayItems});

      case 'pizza':
        let pizzaArray =[]
        pizzaArray = this.state.displayItems.filter(item =>{
          return item.category === 'pizza'
        })
        this.setState({filteredItems: pizzaArray})
        break;

      case 'wing':
        let wingArray =[]
        wingArray = this.state.displayItems.filter(item =>{
          return item.category === 'Wings'
        })
        this.setState({filteredItems: wingArray})
        break;

      case 'beverage':
        let beverageArray =[]
        beverageArray = this.state.displayItems.filter(item =>{
          return item.category === 'Beverage'
        })
        this.setState({filteredItems: beverageArray})
        break;

      default:
        break;
    }
  }

  render(){
      return(
        <div className='manageItemList'>
          <form onSubmit={this.handleShowItemForm}>
            <strong>Filter:</strong>  <select name='filterCategories'>
              <option value='all'>All</option>
              <option value='pizza'>Pizza</option>
              <option value='wing'>Wings</option>
              <option value='beverage'>Beverage</option>
            </select>
            {' '}
            <Popup content="Display existing menu items, may use with filter" trigger={<Button color='teal'>Show items</Button>}/>

          </form>  <br/>
          <Card.Group centered>
            {
              this.state.filteredItems.map((item, index) =>{
                return  <Card key={index} header=<div>{item.name} - $ {item.price}</div>
                  description=<div>category: {item.category}<br/> id: {item.id}</div> extra=<Button onClick={this.handleDeleteItem} value={item.id} negative>Delete</Button>/> })
            }
          </Card.Group>
        </div>)

  }
}
export default ManageItems
