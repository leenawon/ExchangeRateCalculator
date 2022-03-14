import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
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

export const FirstStyle = {
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
};
