import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from './reducers/authReducer';
import studentReducer from './reducers/studentReducer';
import observationReducer from './reducers/observationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  students: studentReducer,
  observations: observationReducer
});

// Use Redux DevTools extension if available, otherwise use applyMiddleware(thunk)
// Actually we need to applyMiddleware in both cases.
//composeWithDevTools handles the enhancers.

const enhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
  : applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  enhancers
);

export default store;
