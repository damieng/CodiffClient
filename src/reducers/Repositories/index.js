export default function (state = [], action) {
  switch(action.type) {
    case 'ADD_REPOSITORY':
      return [...state, action.repository];
    default:
      return state;
  }
}

export function addRepository(repository) {
  return (dispatch) => {
    dispatch({ type: 'ADD_REPOSITORY', repository });
  };
}
