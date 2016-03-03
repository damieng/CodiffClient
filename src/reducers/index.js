import repositories from './Repositories';
import projects from './Projects';
import { combineReducers } from 'redux';

export default combineReducers({
  repositories,
  projects
});
