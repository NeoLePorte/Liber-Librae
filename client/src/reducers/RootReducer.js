import { combineReducers } from 'redux';
import bookReducer from './BookReducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { BOOK_UPDATE } from '../actions/types';

export default combineReducers({
    books: bookReducer,
    form: reduxFormReducer.plugin({
        book: (state, action) => {   // <----- 'book' is name of form given to reduxForm()
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