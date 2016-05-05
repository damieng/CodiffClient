import { hashHistory } from 'react-router';
import Configuration from '../config';
const config = new Configuration();

export default function(state = {}, action) {
  switch(action.type) {
    case 'SIGNED_IN': {
      const newState = {
        ...state,
        token: action.payload
      };

      config.set('authToken', action.payload);
      return newState;
    }
    default:
      return state;
  }
}

export function signIn(authToken) {
  return (dispatch) => {
    dispatch({ type: 'SIGNED_IN', payload: authToken });
  }
};
