export const checkDecimal = (str) => {
  if (str.includes('.')) {
    const splited = str.split('.');
    if (splited[1].length < 2) {
      return str + '0';
    } else {
      return str;
    }
  } else {
    return str + '.00';
  }
};
