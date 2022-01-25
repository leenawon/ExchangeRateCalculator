import React, { useEffect, useState } from "react";

export default function First() {
<<<<<<< HEAD
  return <div>first123</div>;
=======
  const [exchange, setExchange] = useState(0);
  const [country, setCountry] = useState("");
  const [engCountry, setEngCountry] = useState("KRW");
  const [money, setMoney] = useState();
  const [result, setResult] = useState();

  const selectOnChange = ({target: {value}}) => {
    setCountry(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://www.apilayer.net/api/live?access_key=ee50cd7cc73c9b7a7bb3d9617cfb6b9c')
      .then((response) => response.json())
      .then((data) => {
        if (country === '한국') {
          setExchange(data.quotes.USDKRW);
          setEngCountry('KRW');
        } else if (country === '일본') {
          setExchange(data.quotes.USDJPY);
          setEngCountry('JPY')
        } else if (country === '필리핀') {
          setExchange(data.quotes.USDPHP);
          setEngCountry('PHP')
        } else {
          setExchange(data.quotes.USDKRW);
        }
      }
    )};
    fetchData();
  }, [country]);

  const moneyOnChange = ({target: {value}}) => {
    setMoney(value);
  };

  const moneySubmit = (e) => {
    e.preventDefault();
    if(money === "" || money < 0 || money > 10000 || !isFinite(money)) {
      alert('송금액이 바르지 않습니다');
    } else {
      setResult(`수취금액은 ${(exchange * money).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ${engCountry} 입니다.`);
    }
  };

  return (
    <div>
      <h1>환율 계산</h1>
      <h5>송금국가: 미국(USD)</h5>
      <label htmlFor='country'>수취국가: </label>
      <select id='country' onChange={selectOnChange}>
        <option value="한국">한국(KRW)</option>
        <option value="일본">일본(JPY)</option>
        <option value="필리핀">필리핀(PHP)</option>
      </select>
      <h5>환율: {exchange.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} {engCountry}/USD</h5>
      <form>
        <label htmlFor='money'>송금액: </label>
        <input type='number' id='money' onChange={moneyOnChange}></input>
        USD
        <button type='submit' onClick={moneySubmit}>Submit</button>
      </form>
      <h5>{result}</h5>
    </div>
  );
>>>>>>> 87552dcd5193f3c9d9d10905d03e18dbcd68d372
}
