import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    height: 100%;
    width: 100%;
    margin: 0;
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background: ${(props) => props.theme.colors.isabelline};
    font-family: ${(props) => props.theme.typeface}, sans-serif;
    font-size: 17px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
