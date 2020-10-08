import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #0a0a0a;
  }

  body, input, button {
    font-family: 'Maven Pro', sans-serif;
    font-size: 18px;
  }

  h1, h2, h3, h4, h5 {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
