import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <header>
        <figure>
          <img src={`${process.env.PUBLIC_URL}/img/watarium_logo.gif`} alt="ロゴ" />
        </figure>
      </header>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

export default App;
