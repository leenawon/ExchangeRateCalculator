import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { SecondStyle } from '../../styles/SecondStyle';
import { checkDecimal } from './function';

export const {
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
} = SecondStyle;

export default function Second() {
  const country = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
  const [selected, setSelected] = useState(country[0]);
  const [tabs, setTabs] = useState(country.filter((e) => e !== selected));
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [input, setInput] = useState('0');
  const [exchangeRate, setExchangeRate] = useState({});
  const [date, setDate] = useState('');
  const [dropdown, setDropDown] = useState(true);
  const navigate = useNavigate();

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

  const onLinkClick = (path) => {
    navigate(path);
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

  const inputValidate = (inputData) => {
    const pattern =
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z\{\}\[\]\/?.;:|\)*~`!^\-_+<>\#$%&\\\=\(\'\"]/gi;
    return inputData.replace(pattern, '');
  };

  return (
    <Box>
      <TopBox>
        <InputBox
          maxLength="11"
          defaultValue={input}
          onChange={(e) => {
            const num = +e.target.value.split(',').join('');
            e.target.value = inputValidate(num.toLocaleString());
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
      <LinkBoxs>
        <Link onClick={() => onLinkClick('/')}>첫번째 페이지</Link>
        <Link onClick={() => onLinkClick('/second')}>두번째 페이지</Link>
      </LinkBoxs>
    </Box>
  );
}
