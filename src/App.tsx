import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Menu from "./components/Menu";
import CurrentName from "./components/CurrentName";
import About from "./pages/About";
import Membership from "./pages/Membership";

export type Labels =
  | "スケジュール"
  | "展覧会"
  | "メンバーシップ"
  | "ワタリウム美術館について";
export type Urls = "schedule" | "exhibitions" | "membership" | "about";

export interface TransitionProp {
  transitionStatus: TransitionStatus;
  duration: number
}

interface LinkItem {
  label: Labels;
  url: Urls;
}

interface PageItem {
  url: Urls;
  component: React.FC<any>;
}

export const links: LinkItem[] = [
  {
    label: "スケジュール",
    url: "schedule"
  },
  {
    label: "展覧会",
    url: "exhibitions"
  },
  {
    label: "メンバーシップ",
    url: "membership"
  },
  {
    label: "ワタリウム美術館について",
    url: "about"
  }
];

const pages: PageItem[] = [
  {
    url: "about",
    component: About
  },
  {
    url: "membership",
    component: Membership
  }
];

export const TRANSITION_DURATION = 300;

const PageSwicher: React.FC = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={TRANSITION_DURATION}>
        {status => (
          <Switch>
            {pages.map(page => (
              <Route exact={true} path={`/${page.url}`} key={page.url}>
                <page.component transitionStatus={status} />
              </Route>
            ))}
          </Switch>
        )}
      </CSSTransition>
    </TransitionGroup>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header>
        <Logo to="/">
          <img
            src={`${process.env.PUBLIC_URL}/img/watarium_logo.gif`}
            alt="ロゴ"
          />
        </Logo>
        <Menu />
        <CurrentName />
      </Header>
      <MainContent>
        <PageSwicher />
      </MainContent>
    </Router>
  );
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap');
  ${reset}
  h1, h2, h3, p, a, address, button, li, span, label, dd, dl, dt {
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
  img {
    width: 100%;
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
  z-index: 1000;
  height: 100vh;
`;

const Logo = styled(Link)`
  position: fixed;
  top: 52px;
  left: 61px;
  z-index: 1000;
  height: 55px;
`;

const MainContent = styled.main`
  margin-left: 240px;
  width: calc(100% - 240px);
`;

export default App;
