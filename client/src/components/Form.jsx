import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, Form as rForm} from 'redux-form';
import { fetchBooks, createBook, submitUpdate } from '../actions/BookActions'
import { Button, Form, Segment, Header } from 'semantic-ui-react'

class FormComp extends React.Component {
  // TODO: make this work so the component lifecycle is used properly
  // componentDidUpdate(prevProps) {
  //   if (this.props.books.items.filter !== prevProps.books.items.filter) {
  //     console.log('this is filtering prevProps!')
  //     this.props.fetchBooks()
  //   }
  // }

  //submit book handler
  submitBook = (data) => {
    const {title, author, description, isbn, updateId } = data;
    if (!title || !author ||!description ||!isbn)  return;
    if (updateId) {
      this.updateBook(data);
    } else {
      this.postBook(data);
    }
    this.props.fetchBooks()
  }

  //updates book and resets form
  updateBook = (data) => {
    const { reset } = this.props;
    this.props.submitUpdate(data);
    reset();
}

//posts book and resets form
  postBook = (data) => {
    const { reset } = this.props;
    this.props.createBook(data);
    reset();
}

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
        <Form as={rForm} onSubmit={handleSubmit(data => this.submitBook(data))}>
        <Header as='h2' content="Enter Book Info" textAlign="center" dividing />
        <Segment>
        <Form.Field required>
        <label>Title</label>
        <Field
        component="input"
        type="text"
        name="title"
        placeholder="Title of Book"
        />
        </Form.Field>
      
        <Form.Field required>
        <label>Author</label>
        <Field
        component="input"
        type="text"
        name="author"
        placeholder="Author of the Book"
        />
        </Form.Field>
    
        <Form.Field required>
        <label>Description</label>
        <Field
        component="textarea"
        type="text"
        name="description"
        placeholder="Description"
        />
        </Form.Field>
        
        <Form.Field required>
        <label>ISBN</label>    
        <Field
        component="input"
        type="number"
        name="isbn"
        placeholder="123456789"
        />
        </Form.Field>
          {/* TODO: Fix Confirmation prompt to work right with submit button */}
        <Button disabled={pristine || submitting}  style={{background: 'rebeccapurple', color: 'white'}}>Submit</Button>
        
        </Segment>
      </Form>
    );
  }
}

//maps redux store to components props
const mapStateToProps = state => ({
  ...state
 })
 //maps actions to component props
 const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(fetchBooks()),
  createBook: (data) => dispatch(createBook(data)),
  submitUpdate: (data) => dispatch(submitUpdate(data))
 })

//connects form to redux store/actions
FormComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComp);

  //reduxForm creates Form State for the redux store.
 export default reduxForm({
  form: 'book', 
})(FormComp); 