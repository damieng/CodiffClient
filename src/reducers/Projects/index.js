import Configuration from '../../config/';
const config = new Configuration();

export default function (state = config.get('projects') || [], action) {
  switch(action.type) {
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
