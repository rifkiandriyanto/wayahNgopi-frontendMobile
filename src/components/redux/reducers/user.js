const initialState = {
  user: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_USER_PENDING':
      return {
        ...state,
      };
    case 'POST_USER_REJECTED':
      return {
        ...state,
      };
    case 'POST_USER_FULFILLED':
      const newDataUser = [...state.user, action.payload.data.result];
      return {
        ...state,
        user: newDataUser,
      };
    case 'UPDATE_USER_PENDING':
      return {
        ...state,
      };
    case 'UPDATE_USER_REJECTED':
      return {
        ...state,
      };
    case 'UPDATE_USER_FULFILLED':
      const newUserUpdate = state.user.map(user => {
        if (user.id === action.payload.data.result.id) {
          return action.payload.data.result;
        }
        return user;
      });
      return {
        state,
        user: newUserUpdate,
      };

    case 'GET_USER_PENDING':
      return {
        ...state,
      };
    case 'GET_USER_REJECTED':
      return {
        ...state,
      };
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        user: action.payload.data.result,
      };
    default:
      return state;
  }
};

export default user;
