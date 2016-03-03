import Configuration from '../config/';
const config = new Configuration();

export default function (state = config.projects, action) {
  switch(action.type) {
    case 'DIFF_RECEIVED': {
      const { project, diff } = action.payload;
      console.log(state);
      state = state.map(p => {
        if(p.id === project.id) {
          return {
            ...p,
            diff
          }
        }

        return p;
      });

      console.log(state);
      return state;
    }
    case 'SUBSCRIBE_TO_PROJECT': {
      const { repository, project } = action.payload;
      const newState = [...state, { repository, project }];
      config.set('projects', newState);
      return newState;
    }
    default:
      return state;
  }
}

export function subscribeToProject(repository, project) {
  return (dispatch) => {
    dispatch({ type: 'SUBSCRIBE_TO_PROJECT', payload: { repository, project } });
  };
}

export function diffReceived(project, diff) {
  return (dispatch) => {
    console.log('diff received', project);
    dispatch({ type: 'DIFF_RECEIVED', payload: { project, diff } });
  };
}
