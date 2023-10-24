import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
    scroll-behavior: smooth;

}

::-webkit-scrollbar {
  width: 0.4rem;
  height: 1rem;

}
::-webkit-scrollbar-track {
  background: #343541;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(217,217,227,.8);
  border-color: rgba(255,255,255);
  border-radius: 1rem;
  border-width: 1px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgba(217,217,227,.9);

}

body {
    background-color: #0d1b2a;
    overflow-y: auto;
    height: 100vh;
    font-family: 'Nanum Gothic Coding', monospace;
    font-weight: bold;
}

`;

export default GlobalStyles;
