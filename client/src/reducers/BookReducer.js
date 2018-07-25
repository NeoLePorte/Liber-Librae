import { BOOK_FETCH , POST_ERROR, BOOK_DELETE, GET_SINGLE_BOOK } from '../actions/types'

const initialState = {
  items: [],
  item: {},
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
      case GET_SINGLE_BOOK:
      const singleBookId = action.payload;
      const singleBook = state.items.find(c => c.title === singleBookId);
      return {
        ...state,
        item: singleBook
      };
     default:
      return state
    }
   } 