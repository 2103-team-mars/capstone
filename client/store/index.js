import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import mapReducer from './googleMap';
import symptomsReducer from './symptoms';
import appointments from './appointments';

const reducer = combineReducers({
  auth,
  mapDoctors: mapReducer,
  symptoms: symptomsReducer,
  appointments,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
