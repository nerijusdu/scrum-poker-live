const initialState = {
  user: {
    token: null,
    name: ''
  },
  error: '',
  loading: true
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
    case 'TOGGLE_LOADING':
      return {
        ...state,
        loading: action.isLoading
      };
    default:
      return state
  }
}

export default app;