import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

	
	*{
    box-sizing : border-box;
    cursor: default;
    font-family: "'Noto Sans KR', sans-serif";
  }

  a{
    text-decoration : none;
    &:visited{
      text-decoration: none;
      color: black
    }
  }
`;

export default GlobalStyle;
