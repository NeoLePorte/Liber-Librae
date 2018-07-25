import React from 'react'
import { Item, List} from 'semantic-ui-react'

const Book = (props) => (
  <List.Item>
  <List.Content>
    <List.Header as='a'>{props.title}</List.Header>
    <Item.Meta>By: {props.author}</Item.Meta>
    <List.Description>
      <p>{props.description}</p>
    </List.Description>
    <Item.Extra>ISBN: {props.isbn}</Item.Extra>
  </List.Content>
  </List.Item>
)
export default Book