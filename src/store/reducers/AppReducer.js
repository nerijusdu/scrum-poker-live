const initialState = {
  error: ''
};

const app = (state = initialState, action) => {
  switch (action.type) {
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