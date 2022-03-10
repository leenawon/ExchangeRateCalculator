export const moneySubmit = (money, exchange = 1000) => {
  if (money === '' || money < 0 || money > 10000 || !isFinite(money)) {
    return null;
  } else {
    return (exchange * money)
      .toFixed(2)
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
};
