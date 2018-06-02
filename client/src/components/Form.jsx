import React from 'react'
import { Button, Form, Confirm } from 'semantic-ui-react'

class FormComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  

  render() {
    return (
        <Form>
        <Form.Field required>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title of Book"
          value={this.props.title}
          onChange={this.props.handleChangeText}
        />
        </Form.Field>
    
        <Form.Field required>
        <label>Author</label>
        <Form.Input
          type="text"
          name="author"
          placeholder="Author of the Book"
          value={this.props.author}
          onChange={this.props.handleChangeText}
        />
        </Form.Field>
    
        <Form.Field required>
        <label>Description</label>
        <Form.TextArea
          type="text"
          name="description"
          placeholder="Description"
          value={this.props.description}
          onChange={this.props.handleChangeText}
        />
        </Form.Field>
        
        <Form.Field required>
        <label>ISBN</label>    
        <Form.Input
          type="number"
          name="isbn"
          placeholder="123456789"
          value={this.props.isbn}
          onChange={this.props.handleChangeText}
        />
        </Form.Field>
          {/* TODO: Fix Confirmation prompt to work right with submit button */}
        <Button onClick={this.open}>Submit</Button>
        <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.props.submitBook} />
      </Form>
    );
  }
}
  

export default FormComp