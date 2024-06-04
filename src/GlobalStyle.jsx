import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        font-family: 'Helvetica', sans-serif;
        line-height: 1.5;
    };

    body {
      position: relative;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/ffe8f50201af51a0956875d2aeeb9e662eb0b228-3840x2160.png?auto=format&fit=fill&q=80&w=3426');
      overflow-x: hidden;
      z-index: 1; 
    }
    
    body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/ffe8f50201af51a0956875d2aeeb9e662eb0b228-3840x2160.png?auto=format&fit=fill&q=80&w=3426');
    background-size: cover;
    z-index: -1;
  }

  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    background-size: cover;
    z-index: -1; 
  }

  button {
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
}
  
`;

export default GlobalStyle;
