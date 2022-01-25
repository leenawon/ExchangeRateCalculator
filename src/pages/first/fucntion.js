export const moneySubmit = (money, exchange = 1000) => {
  if (money === '' || money < 0 || money > 10000 || !isFinite(money)) {
    return null;
  } else {
    return (exchange * money)
      .toFixed(2)
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
};

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
