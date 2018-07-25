import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';

const middleware = [thunk]

//initializes redux store
export default function configureStore() {
 return createStore(
  rootReducer,
  compose(
   applyMiddleware(...middleware),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),

 );
}