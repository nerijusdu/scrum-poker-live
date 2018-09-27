const initialState = {
  user: {
    token: null,
    name: ''
  },
  error: ''
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        user: {
          token: action.token,
          name: action.name
        }
      };
    case 'SHOW_ERROR':
      return {
        ...state,
        error: action.error
      };
    default:
      return state
  }
}

export default app;