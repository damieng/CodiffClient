import repositories from './Repositories';
import projects from './Projects';
import user from './User';
import { combineReducers } from 'redux';

export default combineReducers({
  repositories,
  projects,
  user
});
