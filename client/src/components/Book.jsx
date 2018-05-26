import React from 'react'
import { Item, List, Button } from 'semantic-ui-react'

const Book = (props) => (
    <List.Item>
      <Item.Content>
        <Item.Header as='a'>{props.title}</Item.Header>
        <Item.Meta>By: {props.author}</Item.Meta>
        <Item.Description>
          <p>{props.description}</p>
        </Item.Description>
        <Item.Extra>ISBN: {props.isbn}</Item.Extra>
      </Item.Content>
      <Button.Group>
        <Button primary compact  onClick={() => { props.handleUpdateBook(props.id); }}>update</Button>
        <Button secondary compact  onClick={() => { props.handleDeleteBook(props.id); }}>delete</Button>
      </Button.Group>
    </List.Item>
)
export default Book