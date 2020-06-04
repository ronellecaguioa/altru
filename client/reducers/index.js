import { combineReducers } from 'redux';
import entryReducer from './entryReducer';
import viewReducer from './viewReducer'
import authReducer from './authReducer';

const rootReducer = combineReducers({
  entry: entryReducer,
  views: viewReducer,
  auth: authReducer
});

export default rootReducer;
