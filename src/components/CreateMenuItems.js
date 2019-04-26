import React, { Fragment} from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';

const CreateMenuItems =(props)=>{
  return(
    <Fragment>
      <Form onSubmit={props.handleCreateMenuItems}  size='large' textalign='center'>
        <strong>Category</strong>
        <select  name='selectCategory' >
          <option value="pizza">Pizza</option>
          <option value="Wings">Wings</option>
          <option value="Beverage">Beverage</option>
        </select>
        <Form.Group widths='equal'>
          <Form.Field control={Input}  label='Item Name'  placeholder='Item Name' name='item_name' onChange={props.handleMenuItemsInput}/>
          <Form.Field  control={Input}  label='Price'  placeholder='Price' type='number'
            step='0.01' name='item_price' onChange={props.handleMenuItemsInput}/>
          <Form.Field control={Input} label="Image" placeholder="image url" name='img_url' onChange={props.handleMenuItemsInput} />
        </Form.Group>
        <Form.Field control={TextArea} label='Description' placeholder='description'
          name='item_description' onChange={props.handleMenuItemsInput}/>
        <Form.Field  control={Button}  content='Submit' type='submit' color='teal'
          fluid style={{width: '15%'}} id='submitItem'/>
      </Form>
    </Fragment>
  )
}
export default CreateMenuItems;
