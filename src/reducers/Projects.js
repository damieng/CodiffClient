import Configuration from '../config/';
const config = new Configuration();

export default function (state = [], action) {
  switch(action.type) {
    case 'DIFF_RECEIVED': {
      const { project, diff } = action.payload;
      state = state.map(p => {
        if(p.id === project.id) {
          return {
            ...p,
            diff
          };
        }

        return p;
      });

      return state;
    }
    case 'SUBSCRIBE_TO_PROJECT': {
      const { repository, project } = action.payload;
      const newState = [...state, { repository, project }];
      config.set('projects', newState);
      return newState;
    }
    case 'CREATE_THREAD': {
      return state;
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

    const createMessagePayload = {
      body: 'Created programmatically.',
      sent_by: 'gisenberg',
      files: diff.map(f => {
        return { filename: f.path, contents: f.lines.join('\n').replace(/[\"]/g, '\\"')
             .replace(/[\\]/g, '\\\\')
             .replace(/[\/]/g, '\\/')
             .replace(/[\b]/g, '\\b')
             .replace(/[\f]/g, '\\f')
             .replace(/[\n]/g, '\\n')
             .replace(/[\r]/g, '\\r')
             .replace(/[\t]/g, '\\t') };
      })
    };
    console.log(createMessagePayload);
    const createMessageUri = `${config.apiUrl}/project/${project.project.id}/messages`;
    console.log(createMessageUri);
    fetch(createMessageUri, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createMessagePayload),
    }).then((response) => {
      return response.json();
    }).then((createdMessage) => {
      console.log(createdMessage);
    });
  };
}
