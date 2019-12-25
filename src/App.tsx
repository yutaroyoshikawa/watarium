import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Menu from './components/Menu';
import CurrentName from './components/CurrentName';

export type Labels = 'スケジュール' | '展覧会' | 'メンバーシップ' | 'ワタリウム美術館について';
export type Urls = 'schedule' | 'exhibitions' | 'membership' | 'about';

interface LinkItem {
  label: Labels;
  url: Urls;
}

export const links: LinkItem[] = [
  {
    label: 'スケジュール',
    url: 'schedule'
  },
  {
    label: '展覧会',
    url: 'exhibitions'
  },
  {
    label: 'メンバーシップ',
    url: 'membership'
  },
  {
    label: 'ワタリウム美術館について',
    url: 'about'
  }
];

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header>
        <Logo to="/">
          <img src={`${process.env.PUBLIC_URL}/img/watarium_logo.gif`} alt="ロゴ" />
        </Logo>
        <Menu />
        <CurrentName />
      </Header>
    </Router>
  );
};

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

export default App;
