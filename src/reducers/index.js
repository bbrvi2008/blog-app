import { combineReducers } from 'redux';

import articlesReducer from './articles';
import userReducer from './user';

export default combineReducers({
  articles: articlesReducer,
  user: userReducer
});