import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Util } from '../../utils';
import { useFetch } from '../../hooks';
import { useNavigate } from 'react-router';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  width: 100vw;
  height: 50vh;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
`;

const SubTitle = styled.h2`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 14px;
`;

const ContentText = styled.h5`
  padding-right: 5px;
  font-weight: 500;
  font-size: 14px;
  color: blue;
`;

const ReceptionCountry = styled.div`
  display: flex;
`;

const SelectCountry = styled.select`
  position: relative;
  margin-top: 10px;
  margin-left: 8px;
  height: 23px;
`;

const InputFormWrapper = styled.form`
  display: flex;
  align-items: center;
  height: 50px;
`;

const InputMoney = styled.input.attrs({ type: 'number' })`
  margin: 8px;
  max-width: 100px;
  height: 23px;
`;

const LinkBoxs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  width: 30vw;
  border: none;
`;

const Link = styled.button`
  cursor: pointer;
  color: none;
  &:visited {
    text-decoration: none;
    color: black;
  }
`;

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

  useEffect(() => {}, [engCountry]);

  useEffect(() => {
    if (!response) return;

    setCountry('한국');
    setEngCountry('KRW');
  }, [response]);

  useEffect(() => {
    if (!response) return;

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
  }, [country]);

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
        ></InputMoney>
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
