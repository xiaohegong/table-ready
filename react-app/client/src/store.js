import { createStore, applyMiddleware, compose } from 'redux';
// thunk is middleware, compose: redux tools for chrome extension
import thunk from 'redux-thunk';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';

// const initialState = {};
//
// // array of any middleware we will use
// const middleWare = [thunk];
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(...middleWare))
// );

// make a new creator, Newly-added code
export const middlewares = [ReduxThunk];
export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export const store = createStoreWithMiddleware(rootReducer);

// export default store;
