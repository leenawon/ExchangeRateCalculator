import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 20px;
`;

const InputBox = styled.input`
  margin: 1rem;
  width: 8rem;
  height: 2rem;
`;

const DropDownBox = styled.div`
  margin: 1rem;
  width: 8rem;
  height: 2rem;
`;

const SelectEle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 2rem;
  border: 1px solid black;
  border-bottom: ${(props) => (props.isSelected ? 'none' : '')};
`;

const DropDownEle = styled.li`
  position: relative;
  z-index: 1000;
  display: flex;
  display: ${(props) => (props.dropdown ? 'none' : '')};
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 2rem;
  border: 1px solid black;
  border-top: none;
  background: white;
  cursor: pointer;
`;

const TopBox = styled.div`
  display: flex;
  width: 18rem;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  width: 18rem;
  height: 20rem;
  border: 1px solid black;
`;

const TapWrapper = styled.div`
  display: flex;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 2rem;
  border: 1px solid black;
  cursor: pointer;
  border-bottom: ${(props) => (props.isSelected ? 'none' : '')};
`;

const Display = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 15rem;
  height: 15rem;
  border: 1px solid black;
  border-top: none;
`;

const ResultWrapper = styled.div`
  display: flex;
`;

const ResultBox = styled.div`
  display: flex;
  width: 5rem;
`;

const CountryBox = styled.div`
  width: 5rem;
`;

const LinkBoxs = styled.div`
  display: flex;
  width: 30vw;
  justify-content: space-between;
  border: none;
  margin-top: 50px;
`;

const Link = styled.button`
  cursor: pointer;
  color: none;
  &:visited {
    text-decoration: none;
    color: black;
  }
`;

const DateBox = styled.div``;

export const SecondStyle = {
  Box,
  InputBox,
  DropDownBox,
  SelectEle,
  DropDownEle,
  TopBox,
  BottomBox,
  TapWrapper,
  Tab,
  Display,
  ResultWrapper,
  ResultBox,
  CountryBox,
  LinkBoxs,
  Link,
  DateBox,
};
