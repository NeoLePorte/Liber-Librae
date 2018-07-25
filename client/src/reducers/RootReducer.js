import { combineReducers } from 'redux';
import bookReducer from './BookReducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { BOOK_UPDATE } from '../actions/types';

export default combineReducers({
    books: bookReducer,
    //the form reducer plugin allows for manual manipulation of form state.
    //In this case its filling the form values with the book info of a selected book to be updated.
    form: reduxFormReducer.plugin({
        book: (state, action) => {   
      switch(action.type) {
        case BOOK_UPDATE:
        const { title, author, description, isbn, updateId } = action;
        return {
          ...state,
            values: {
                ...state.values,
                title: title, 
                author: author,
                description: description, 
                isbn: isbn,
                updateId: updateId
            },
            fields: {
                ...state.fields,
                title: title, 
                author: author,
                description: description, 
                isbn: isbn
            }
        };
        default:
          return state
      }
    }
    })
});