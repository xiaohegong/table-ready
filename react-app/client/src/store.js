import { createStore, applyMiddleware, compose } from 'redux';
// thunk is middleware, compose: redux tools for chrome extension
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

// array of any middleware we will use
const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

export default store;
