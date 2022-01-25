import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Second() {
  const country = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
  const [selected, setSelected] = useState(country[0]);
  const [tabs, setTabs] = useState(country.filter((e) => e !== selected));
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [input, setInput] = useState('0');
  const [exchangeRate, setExchangeRate] = useState({});
  const [date, setDate] = useState('');
  const [dropdown, setDropDown] = useState(true);

  const ACCESS_KEY = process.env.REACT_APP_CURRENCY_KEY;
  const END_POINT = process.env.REACT_APP_END_POINT;

  const getConverted = () => {
    axios
      .get(
        `${END_POINT}live?access_key=${ACCESS_KEY}&currencies=USD,CAD,KRW,HKD,JPY,CNY`
      )
      .then((res) => {
        setExchangeRate({
          USD: res.data.quotes.USDUSD,
          CAD: res.data.quotes.USDCAD,
          KRW: res.data.quotes.USDKRW,
          HKD: res.data.quotes.USDHKD,
          JPY: res.data.quotes.USDJPY,
          CNY: res.data.quotes.USDCNY,
        });
        const timestamp = new Date(res.data.timestamp * 1000).toDateString();
        const tempArr = timestamp.split(' ');
        const year = tempArr[3];
        const month = tempArr[1];
        const day = tempArr[2];
        setDate(`${year}-${month}-${day}`);
      });
  };

  const numInput = +input.split(',').join('');
  const result = +(
    numInput *
    (exchangeRate[selectedTab] / exchangeRate[selected])
  ).toFixed(2);

  useEffect(() => {
    getConverted();
  }, []);

  useEffect(() => {
    setTabs(country.filter((e) => e !== selected));
  }, [selected]);

  useEffect(() => {
    setSelectedTab(tabs[0]);
  }, [tabs]);

  const isDropDown = () => {
    setDropDown(!dropdown);
  };

  const offDropDown = () => {
    setDropDown(true);
  };

  const checkDecimal = (str) => {
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

  return (
    <Box>
      <TopBox>
        <InputBox
          defaultValue={input}
          onChange={(e) => {
            const num = +e.target.value.split(',').join('');
            e.target.value = num.toLocaleString();
          }}
          onBlur={(e) => {
            const num = +e.target.value.split(',').join('');
            if (num > 1000) {
              e.target.value = '1,000';
            }
            setInput(e.target.value);
          }}
        />
        <DropDownBox>
          <SelectEle
            onClick={() => {
              isDropDown();
            }}
          >
            {selected} ▿
          </SelectEle>
          {tabs.map((e, i) => {
            return (
              <DropDownEle
                key={i}
                onClick={() => {
                  setSelected(e);
                  getConverted();
                  offDropDown();
                }}
                isSelected={e === selectedTab}
                dropdown={dropdown}
              >
                {e}
              </DropDownEle>
            );
          })}
        </DropDownBox>
      </TopBox>
      <BottomBox>
        <TapWrapper>
          {tabs.map((e, i) => {
            return (
              <Tab
                key={i}
                onClick={() => {
                  setSelectedTab(e);
                }}
                isSelected={e === selectedTab}
              >
                {e}
              </Tab>
            );
          })}
        </TapWrapper>
        <Display>
          <ResultWrapper>
            <CountryBox>{selectedTab}</CountryBox>
            <ResultBox> {checkDecimal(result.toLocaleString())}</ResultBox>
          </ResultWrapper>
          <DateBox>기준일: {date}</DateBox>
        </Display>
      </BottomBox>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.input`
  width: 8rem;
  height: 2rem;
  margin: 1rem;
`;

const DropDownBox = styled.div`
  width: 8rem;
  height: 2rem;
  margin: 1rem;
`;

const SelectEle = styled.div`
  box-sizing: border-box;
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
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 2rem;
  border: 1px solid black;
  border-top: none;
  background: white;
  z-index: 1000;
  display: ${(props) => (props.dropdown ? 'none' : '')};
`;

const TopBox = styled.div`
  display: flex;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  border: 1px solid blue;
  margin: 1rem;
`;

const TapWrapper = styled.div`
  display: flex;
`;

const Tab = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 2rem;
  border: 1px solid black;
  border-bottom: ${(props) => (props.isSelected ? 'none' : '')};
`;

const Display = styled.div`
  width: 15rem;
  height: 15rem;
  border: 1px solid black;
  box-sizing: border-box;
  border-top: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
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

const DateBox = styled.div``;
