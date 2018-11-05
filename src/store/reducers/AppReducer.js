import { MessageType } from "../../constants";

const initialState = {
  user: {
    token: null,
    name: ''
  },
  message: {
    type: MessageType.Success,
    text: ''
  },
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
    case 'SHOW_MESSAGE':
      return {
        ...state,
        message: {
          type: action.messageType || MessageType.Success,
          text: action.text || null
        }
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