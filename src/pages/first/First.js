import React, { useEffect, useState } from 'react';
import { FirstStyle } from '../../styles/FirstStyle';
import { Util } from '../../utils';
import { useFetch } from '../../hooks';
import { useNavigate } from 'react-router';

const {
  Wrapper,
  Title,
  SubTitle,
  ContentText,
  ReceptionCountry,
  SelectCountry,
  InputFormWrapper,
  InputMoney,
  LinkBoxs,
  Link,
} = FirstStyle;

export default function First() {
  const defParams = { url: 'live', params: null };
  const navigate = useNavigate();

  const [exchange, setExchange] = useState(0);
  const [country, setCountry] = useState('');
  const [engCountry, setEngCountry] = useState('KRW');
  const [money, setMoney] = useState(0);
  const [result, setResult] = useState(0);
  const { response } = useFetch(defParams);

  const onLinkClick = (path) => {
    navigate(path);
  };

  const moneySubmit = (e) => {
    e.preventDefault();
    if (money === '' || money <= 0 || money > 10000 || !isFinite(money)) {
      alert('송금액이 바르지 않습니다');
    } else {
      setResult(Util.getBeautifiedNum((exchange * money).toFixed(2)));
    }
  };

  const selectExchange = () => {
    switch (country) {
      case '일본':
        setExchange(response.USDJPY);
        setEngCountry('JPY');
        break;
      case '필리핀':
        setExchange(response.USDPHP);
        setEngCountry('PHP');
        break;
      default:
        setExchange(response.USDKRW);
        setEngCountry('KRW');
        break;
    }
  };

  const onChange = (e, type) => {
    switch (type) {
      case 'select':
        setCountry(e.target.value);
        selectExchange();
        setResult(0);
        break;
      case 'money':
        setMoney(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!response) return;

    setCountry('한국');
    setEngCountry('KRW');
  }, [response]);

  useEffect(() => {
    if (!response) return;

    selectExchange();
  }, [country]);

  return (
    <Wrapper>
      <Title>환율 계산</Title>
      <SubTitle>송금국가: 미국(USD)</SubTitle>
      <ReceptionCountry>
        <SubTitle htmlFor="country">수취국가: </SubTitle>
        <SelectCountry id="country" onChange={(e) => onChange(e, 'select')}>
          <option value="한국">한국(KRW)</option>
          <option value="일본">일본(JPY)</option>
          <option value="필리핀">필리핀(PHP)</option>
        </SelectCountry>
      </ReceptionCountry>
      <ContentText>{`환율: ${Util.getBeautifiedNum(
        exchange.toFixed(2)
      )} ${engCountry} / USD`}</ContentText>
      <InputFormWrapper>
        <SubTitle htmlFor="money">송금액: </SubTitle>
        <InputMoney
          type="number"
          id="money"
          onChange={(e) => onChange(e, 'money')}
        />
        <ContentText>USD</ContentText>
        <button type="submit" onClick={moneySubmit}>
          Submit
        </button>
      </InputFormWrapper>
      {result < 0 || result === 0 ? null : (
        <ContentText>{`수취 금액은 ${result} ${engCountry} 입니다.`}</ContentText>
      )}
      <LinkBoxs>
        <Link onClick={() => onLinkClick('/')}>첫번째 페이지</Link>
        <Link onClick={() => onLinkClick('/second')}>두번째 페이지</Link>
      </LinkBoxs>
    </Wrapper>
  );
}
