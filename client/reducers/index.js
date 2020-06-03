import { combineReducers } from 'redux';
import entryReducer from './entryReducer';
import viewReducer from './viewReducer'

const rootReducer = combineReducers({
  entry: entryReducer,
  views: viewReducer
});

export default rootReducer;
