import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import { Link, useLocation } from 'react-router-dom';

const TRANSITION_DURATION = 300;

interface LinkItem {
  label: string;
  url: string;
}

const links: LinkItem[] = [
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

const useMenuInit = (setIsOpen: (state: boolean) => void) => {
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    // eslint-disable-next-line
  }, [location]);
};

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useMenuInit(setIsOpen);

  return (
    <>
      <IconBars onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <CSSTransition in={isOpen} timeout={TRANSITION_DURATION}>
        {state => (
          <MenuWrap state={state}>
            <MenuList>
              {
                links.map(item => (
                  <MenuItem key={item.url}>
                    <Link to={`/${item.url}`}>
                      {item.label}
                    </Link>
                  </MenuItem>
                ))
              }
            </MenuList>
          </MenuWrap>
        )}
      </CSSTransition>
    </>
  )
};

interface MenuWrap {
  state: TransitionStatus
}

const MenuWrap = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: #fff;

  ${(props: MenuWrap) => {
    switch (props.state) {
      case 'entering':
        return css`
          opacity: 0;
        `
      case 'entered':
        return css`
          opacity: 1;
          transition: opacity ${TRANSITION_DURATION}ms ease;
        `
      case 'exiting':
        return css`
          opacity: 1;
        `
      case 'exited':
        return css`
          opacity: 0;
          transition: opacity ${TRANSITION_DURATION}ms ease;
        `
    }
  }}
`;

const MenuList = styled.ul`
  margin-right: 204px;
`;

const MenuItem = styled.li`
  font-size: 20px;
  color: #707070;

  &:not(:last-child) {
    margin-bottom: 80px;
  }
`;

const bar = css`
  content: '';
  display: block;
  height: 2px;
  background-color: #707070;
  transform-origin: center left;
  transition: width .2s ease-out, transform .2s ease-out;
`;

interface Bars {
  isOpen: boolean;
}

const IconBars = styled.div`
  width: 58px;
  height: 21px;
  margin: 47px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  z-index: 1000;

  &::before {
    ${bar}
    transform: ${(props: Bars) => props.isOpen && 'rotate(20deg)'};
    width: 58px;
  }

  &::after {
    ${bar}
    width: ${(props: Bars) => props.isOpen ? '58px' : '35px'};
    transform: ${(props: Bars) => props.isOpen && 'rotate(-20deg)'};
  }

  &:hover {
    &:after {
      width: 58px;
    }
  }
`;

export default Menu;
