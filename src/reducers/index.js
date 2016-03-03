import repositories from './Repositories';
import projects from './Projects';
import diffs from './Diffs';
import { combineReducers } from 'redux';


export default combineReducers({
  repositories,
  projects,
  diffs
});
