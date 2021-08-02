const isValidEmail = (email: string): boolean => {
  const regEx = RegExp('^\\S+@\\S+\\.\\S+$', 'g');
  return regEx.test(email);
};

export { isValidEmail };
