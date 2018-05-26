import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const FormComp = props => (
  <Form onSubmit={props.submitBook}>

    <Form.Field required>
    <label>Title</label>
    <input
      type="text"
      name="title"
      placeholder="Title of Book"
      value={props.title}
      onChange={props.handleChangeText}
    />
    </Form.Field>

    <Form.Field required>
    <label>Author</label>
    <Form.Input
      type="text"
      name="author"
      placeholder="Author of the Book"
      value={props.author}
      onChange={props.handleChangeText}
    />
    </Form.Field>

    <Form.Field required>
    <label>Description</label>
    <Form.TextArea
      type="text"
      name="description"
      placeholder="Description"
      value={props.description}
      onChange={props.handleChangeText}
    />
    </Form.Field>
    
    <Form.Field required>
    <label>ISBN</label>    
    <Form.Input
      type="number"
      name="isbn"
      placeholder="123456789"
      value={props.isbn}
      onChange={props.handleChangeText}
    />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default FormComp