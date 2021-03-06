import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { Labels, Urls } from "./commons/types";
import { useCurrentName } from "./commons/hooks";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Menu from "./components/Menu";
import CurrentName from "./components/CurrentName";
import NotFound from "./pages/NotFound";
import moment from "moment";
import "moment/locale/ja";
import About from "./pages/About";
import Membership from "./pages/Membership";
import Home from "./pages/Home";
import Exhibitions from "./pages/Exhibitions";
import Schedule from "./pages/Schedule";

moment.locale("ja");

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
    label: "トップ",
    url: ""
  },
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
  },
  {
    url: "",
    component: Home
  },
  {
    url: "exhibitions",
    component: Exhibitions
  },
  {
    url: "schedule",
    component: Schedule
  }
];

export const TRANSITION_DURATION = 300;

const PageSwicher: React.FC = () => {
  const location = useLocation();
  const currentName = useCurrentName();

  useEffect(() => {
    window.setTimeout(() => {
      window.scrollTo(0, 0);
      document.title = `ワタリウム美術館｜${currentName ? currentName : "トップ"}`;
    }, 0);
  }, [location, currentName])

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={TRANSITION_DURATION}>
        {status => (
          <Switch>
            {pages.map(page => (
              <Route exact={true} path={`/${page.url}`} key={page.url}>
                <page.component
                  transitionStatus={status}
                  duration={TRANSITION_DURATION}
                />
              </Route>
            ))}
            <Route path={"*"}>
              <NotFound />
            </Route>
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
  h1, h2, h3, p, a, address, button, li, span, label, dd, dl, dt, time, div {
    font-family: 'Noto Sans JP', 'YuGo-Medium', sans-serif;
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
  z-index: 1000;

  @media screen and (min-width: 1024px) {
    top: 0;
    left: 61px;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    top: 20px;
    left: 0;
    width: 100vw;
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  @media screen and (max-width: 633px) {
    top: 20px;
    left: 0;
    width: 100vw;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
`;

const Logo = styled(Link)`
  position: fixed;
  top: 52px;
  left: 61px;
  z-index: 1000;
  height: 55px;
  display: inline-block;

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    top: 24px;
    left: 28px;
    width: 82px;
  }

  @media screen and (max-width: 633px) {
    top: 24px;
    left: 28px;
    width: 82px;
  }
`;

const MainContent = styled.main`
  min-width: 320px;
  min-height: 568px;

  @media screen and (min-width: 1024px) {
    margin-left: 240px;
    width: calc(100% - 240px);
  }
`;

export default App;
