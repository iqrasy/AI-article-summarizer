import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'ppneuebit-bold';
    src: url('/fonts/ppneuebit-bold.otf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'PPMondwest-regular';
    src: url('/fonts/PPMondwest-regular.otf') format('truetype');
  font-weight: normal;
  font-style: normal;
}


:root {
    --primary-100:#FF6600;
    --primary-200:#ff983f;
    --primary-300:#ffffa1;
    --accent-100:#F5F5F5;
    --accent-200:#929292;
    --text-100:#FFFFFF;
    --text-200:#e0e0e0;
    --bg-100:#1D1F21;
    --bg-200:#2c2e30;
    --bg-300:#444648;
      
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
   scroll-behavior: smooth;
}



body {
    height: 100vh;
    width: 100vw;
    margin: 0;
}

`;

export default GlobalStyles;
