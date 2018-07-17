import { BOOK_FETCH , POST_ERROR, BOOK_DELETE, BOOK_UPDATE } from '../actions/types'
import { formValueSelector } from 'redux-form'



const initialState = {
  items: [],
  item: {},
  open: false
}

export default (state = initialState, action) => {
    switch (action.type) {
     case BOOK_FETCH:
      return {
        ...state,
        items: action.payload
      };
      case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
      case BOOK_DELETE:
      const deleteId = action.payload;
      const deleteItem = state.items.findIndex(c => c._id === deleteId);
        state.items = [
        ...state.items.slice(0, deleteItem),
        ...state.items.slice(deleteItem + 1),
      ]
      return {
        ...state,
      };
      // case BOOK_UPDATE:
      // const updateId = action.payload;
      // const updateItem = state.items.findIndex(c => c._id === updateId);
      // const selector = formValueSelector('book')
      // const values = selector(state, 'title', 'author', 'description', 'isbn')
      // console.log(values)
      //   // state.form.book.values = {
      //   // title: updateItem.title, 
      //   // author: updateItem.author,
      //   // description: updateItem.description, 
      //   // isbn: updateItem.isbn, 
      //   // }
      // return {
      //   ...state,
      // };
     default:
      return state
    }
   } 