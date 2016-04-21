import Configuration from '../config/';
const config = new Configuration();

export default function (state = { projects: [], selectedProjectIndex: 0 }, action) {
  switch(action.type) {
    case 'DIFF_RECEIVED': {
      const { project, delta } = action.payload;
      const nextState = {
        ...state,
        projects: state.projects.map(p => {
          if(p.id === project.id) {
            return {
              ...p,
              diff: delta.diff,
              diffHash: delta.hash
            };
          }

          return p;
        })
      };

      return nextState;
    }
    case 'SUBSCRIBE_TO_PROJECT': {
      const { repository, project } = action.payload;
      const nextState = {
        ...state,
        projects: [...state.projects, { repository, project }]
      };
      return nextState;
    }
    case 'CREATE_THREAD': {
      return state;
    }
    case 'LOADING_MESSAGES': {
      return state;
    }
    case 'LOADED_MESSAGES': {
      const { messages, project } = action.payload;
      const nextState = {
        ...state,
        projects: state.projects.map(p => {
          if(p.id === project.id) {
            return {
              ...p,
              messages
            };
          }

          return p;
        })
      };
      return nextState;
    }
    case 'SET_SELECTED_PROJECT_INDEX': {
      return {
        ...state,
        selectedProjectIndex: action.payload.newIndex,
      };
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

export function getMessagesForProject(project, since) {
  return (dispatch) => {
    dispatch({ type: 'LOADING_MESSAGES', payload: { project } });
    const sinceQuery = (since && since.toIsoString()) || 0;
    console.log(project);
    const messagesUri =
      `${config.apiUrl}/project/${project.project.id}/messages?since=${sinceQuery}`;
    console.log(messagesUri);
    fetch(messagesUri, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((messages) => {
      messages = messages.items.map(m => ({
        id: m.message_id,
        from: m.sent_by,
        text: m.body,
        files: m.files
      }));
      dispatch({ type: 'LOADED_MESSAGES', payload: { project, messages } });
    });
  };
}

export function changeSelectedProjectIndex(newIndex) {
  return (dispatch) => {
    dispatch({ type: 'SET_SELECTED_PROJECT_INDEX', payload: { newIndex } });
  };
}

export function diffReceived(project, delta) {
  return (dispatch) => {
    console.log('diff received', project);
    dispatch({ type: 'DIFF_RECEIVED', payload: { project, delta } });

    const createMessagePayload = {
      body: 'Created programmatically.',
      sent_by: 'gisenberg',
      files: delta.diff.map(f => {
        return {
          filename: f.path,
          contents: f.lines.join('\n')
             .replace(/[\\]/g, '\\\\')
             .replace(/[\"]/g, '\\"')
             .replace(/[\/]/g, '\\/')
             .replace(/[\b]/g, '\\b')
             .replace(/[\f]/g, '\\f')
             .replace(/[\n]/g, '\\n')
             .replace(/[\r]/g, '\\r')
             .replace(/[\t]/g, '\\t')
        };
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
