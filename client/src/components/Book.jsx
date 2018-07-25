import React from 'react'
import propTypes from 'prop-types'
import { Item, List} from 'semantic-ui-react'

//single book in BookList
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
);

Book.propTypes = {
  title: propTypes.string.isRequired,
  author: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  ISBN: propTypes.string.isRequired
}
export default Book