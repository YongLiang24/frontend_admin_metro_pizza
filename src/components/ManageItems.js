import React, {Component} from 'react';

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
      // console.log('checkUserItems..',json)
      this.setState({
        displayItems: json
      })
    })
  }

  updateAfterDelete =()=>{
    fetch('https://backend-metro-pizza.herokuapp.com/api/v1/menu_items')
    .then(resp => resp.json())
    .then(json=>{
      // console.log('checkUserItems..',json)
      this.setState({
        filteredItems: json
      })
    })
  }

  handleDeleteItem = (ev)=>{
    console.log('check delete', ev.target.value)
    fetch(`https://backend-metro-pizza.herokuapp.com/api/v1/menu_items/${ev.target.value}`,{
      method: 'DELETE'
    })
    setTimeout(this.updateAfterDelete, 2000)
  }

  handleShowItemForm = (ev)=>{
    ev.preventDefault()
    if(this.state.hideItems){this.setState({hideItems: false})}
    else{this.setState({hideItems: true})}
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
    if(this.state.hideItems){
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
            <button type='submit' className="mini circular ui teal button">Show items</button>
          </form>
        </div>)}
    else{
      return(
        <div className='manageItemList'>
          <form onSubmit={this.handleShowItemForm}>
            Filter:  <select name='filterCategories'>
              <option value='all'>All</option>
              <option value='pizza'>Pizza</option>
              <option value='wing'>Wings</option>
              <option value='beverage'>Beverage</option>
            </select>
            {' '}
            <button type='submit' className="mini circular ui teal button">Hide items</button>
          </form>
          <hr/>
          <div >
            {
              this.state.filteredItems.map((item, index) =>{
                return <h3 key={index}>Name: {item.name} - {item.category} -{' '}
                  <button onClick={this.handleDeleteItem} value={item.id} className="mini circular ui teal button">Delete</button><hr/></h3>  })
            }
          </div>
        </div>)}
  }
}
export default ManageItems
