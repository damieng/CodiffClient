export default function (state = {}, action) {
  switch(action.type) {
    case 'DIFF_RECEIVED': {
      const { project, diff } = action.payload;
      return state;
    }
    default:
      return state;
  }
}

export function diffReceived(project, diff) {
  return (dispatch) => {
    console.log('diff received', project);
    dispatch({ type: 'DIFF_RECEIVED', payload: { project, diff } });
  };
}
