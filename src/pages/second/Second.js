import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Second() {
  const country = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
  const [selected, setSelected] = useState(country[0]);
  const [tabs, setTabs] = useState(country.filter((e) => e !== selected));
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [input, setInput] = useState(0);
  const [exchangeRate, setExchangeRate] = useState({});
  const [date, setDate] = useState('');

  const ACCESS_KEY = process.env.REACT_APP_CURRENCY_KEY;
  const END_POINT = process.env.REACT_APP_END_POINT;

  const getConverted = () => {
    axios
      .get(
        `${END_POINT}live?access_key=${ACCESS_KEY}&currencies=USD,CAD,KRW,HKD,JPY,CNY`
      )
      .then((res) => {
        setExchangeRate(res.data.quotes);
        const timestamp = new Date(res.data.timestamp * 1000).toDateString();
        const tempArr = timestamp.split(' ');
        const year = tempArr[3];
        const month = tempArr[1];
        const day = tempArr[2];
        setDate(`${year}-${month}-${day}`);
      });
  };

  useEffect(() => {
    getConverted();
  }, []);

  useEffect(() => {
    console.log(exchangeRate);
  }, [exchangeRate]);

  useEffect(() => {
    setTabs(tabs.filter((e) => e !== selected));
  }, [selected]);

  return (
    <Box>
      <TopBox>
        <InputBox
          defaultValue={input}
          onBlur={(e) => {
            if (e.target.value > 1000) {
              e.target.value = 1000;
            }
            setInput(e.target.value);
          }}
        />
        <DropDownBox></DropDownBox>
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
          {selectedTab}
          기준일: {date}
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
`;
