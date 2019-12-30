import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Transition } from "react-transition-group";
import { Link, useLocation } from "react-router-dom";
import { links, TRANSITION_DURATION, TransitionProp } from "../App";

const useMenuWrap = (): string => {
  const [currentName, setCurrentName] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setCurrentName(location.pathname);
    // eslint-disable-next-line
  }, []);

  return currentName;
};

interface MenuWrapProps extends TransitionProp {}

const MenuWrap: React.FC<MenuWrapProps> = props => {
  const currentName = useMenuWrap();

  return (
    <Wrap transitionStatus={props.transitionStatus} duration={props.duration}>
      <MenuList>
        {links.map(
          item =>
            `/${item.url}` !== currentName && (
              <MenuItem key={item.url}>
                <Link to={`/${item.url}`}>{item.label}</Link>
              </MenuItem>
            )
        )}
      </MenuList>
    </Wrap>
  );
};

const useMenu = (): [boolean, (state: boolean) => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    // eslint-disable-next-line
  }, [location]);

  return [isOpen, setIsOpen];
};

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useMenu();

  return (
    <>
      <IconBars onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <Transition
        in={isOpen}
        timeout={TRANSITION_DURATION}
        unmountOnExit={true}
      >
        {state => (
          <MenuWrap transitionStatus={state} duration={TRANSITION_DURATION} />
        )}
      </Transition>
    </>
  );
};

const Wrap = styled.div`
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

  ${(props: TransitionProp) => {
    switch (props.transitionStatus) {
      case "entering":
        return css`
          opacity: 0;
        `;
      case "entered":
        return css`
          opacity: 1;
          transition: opacity ${props.duration}ms ease;
        `;
      case "exited":
        return css`
          opacity: 1;
        `;
      case "exiting":
        return css`
          opacity: 0;
          transition: opacity ${props.duration}ms ease;
        `;
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
  content: "";
  display: block;
  height: 2px;
  background-color: #707070;
  transform-origin: center left;
  transition: width 0.2s ease-out, transform 0.2s ease-out;
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
    transform: ${(props: Bars) => props.isOpen && "rotate(20deg)"};
    width: 58px;
  }

  &::after {
    ${bar}
    width: ${(props: Bars) => (props.isOpen ? "58px" : "35px")};
    transform: ${(props: Bars) => props.isOpen && "rotate(-20deg)"};
  }

  &:hover {
    &:after {
      width: 58px;
    }
  }
`;

export default Menu;
