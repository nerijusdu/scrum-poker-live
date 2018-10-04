export const showError = (error) => ({
  type: 'SHOW_ERROR',
  error
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
