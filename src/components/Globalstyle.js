import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
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
    background-color: var(--bg-100);
    height: 100vh;
    font-family: 'Nanum Gothic Coding', monospace;
    color: white;

	@media only screen and (max-width: 480px) {
    height: 100svh;
  }
   
}

`;

export default GlobalStyles;
