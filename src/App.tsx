import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Menu from './components/Menu';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header>
        <Logo to="/">
          <img src={`${process.env.PUBLIC_URL}/img/watarium_logo.gif`} alt="ロゴ" />
        </Logo>
        <Menu />
        <PageName>展示一覧</PageName>
      </Header>
    </Router>
  );
}

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap');
  ${reset}
  h3, p, a {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 18px;
  }
  a {
    text-decoration: none;
    color: #707070;
    transition: color .2s ease;
    &:hover {
      color: #202020;
    }
  }
`;

const Header = styled.header`
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  top: 0;
  left: 61px;
  z-index:1000;
  height: 100vh;
`;

const Logo = styled(Link)`
  position: fixed;
  top: 52px;
  left: 61px;
  z-index: 1000;
  height: 55px;
`;

const PageName = styled.h3`
  font-size: 15px;
  color: #707070;
  display: flex;
  align-items: flex-start;
`

export default App;
