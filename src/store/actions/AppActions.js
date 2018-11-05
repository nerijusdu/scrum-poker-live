export const showMessage = (text, messageType) => ({
  type: 'SHOW_MESSAGE',
  text,
  messageType
});

export const saveUser = (token, name) => ({
  type: 'SAVE_USER',
  token,
  name
});

export const toggleLoading = (isLoading) => ({
  type: 'TOGGLE_LOADING',
  isLoading
});
