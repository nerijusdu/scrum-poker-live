export default {
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase())
      ? 'Email is incorrect'
      : '';
  },
  validateLength(text, length, name) {
    return !text || text.length < length
      ? `${name} must be atleast ${length} characters`
      : '';
  },
  validateMatch(x, y, name) {
    return x !== y
      ? `${name} do not match`
      : '';
  }
};
