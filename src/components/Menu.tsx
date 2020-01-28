import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Transition } from "react-transition-group";
import { Link, useLocation } from "react-router-dom";
import { links, TRANSITION_DURATION } from "../App";
import { TransitionProp } from "../commons/types";

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
        {links
          .filter(link => `/${link.url}` !== currentName)
          .map((item, index) => (
            <MenuItem key={item.url} itemIndex={index}>
              <Link to={`/${item.url}`}>{item.label}</Link>
            </MenuItem>
          ))}
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

  @media screen and (max-width: 633px) {
    justify-content: flex-start;
  }
`;

const MenuList = styled.ul`
  @media screen and (min-width: 1024px) {
    margin-right: 204px;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    margin-right: 50px;
  }
  @media screen and (max-width: 633px) {
    margin-left: 39px;
  }
`;

interface MenuItem {
  itemIndex: number;
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const MenuItem = styled.li`
  color: #707070;
  opacity: 0;
  animation: ${slideIn} 500ms ease 1 forwards;
  animation-delay: ${(props: MenuItem) =>
    `${props.itemIndex * 100 + TRANSITION_DURATION}ms`};

  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 3px;
    border-radius: 3px;
    background-color: #707070;
    transform: translateY(10px);
    margin-top: 5px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 300ms ease;
  }

  &:hover {
    &::after {
      transform: scaleX(1);
    }
  }

  @media screen and (min-width: 1024px) {
    font-size: 20px;
    &:not(:last-child) {
      margin-bottom: 80px;
    }
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 20px;
    &:not(:last-child) {
      margin-bottom: 80px;
    }
  }

  @media screen and (max-width: 633px) {
    font-size: 15px;
    &:not(:last-child) {
      margin-bottom: 56px;
    }
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  z-index: 1000;

  @media screen and (min-width: 1024px) {
    width: 58px;
    height: 21px;
  }

  @media screen and (max-width: 1023px) and (min-width: 633px) {
    width: 58px;
    height: 21px;
    margin: 47px 90px 47px 0;
  }

  @media screen and (max-width: 632px) {
    width: 37px;
    height: 13px;
    margin: 24px 23px 0 0;
  }

  &::before {
    ${bar}
    transform: ${(props: Bars) => props.isOpen && "rotate(20deg)"};
    width: 100%;
  }

  &::after {
    ${bar}
    width: ${(props: Bars) => (props.isOpen ? "100%" : "70%")};
    transform: ${(props: Bars) => props.isOpen && "rotate(-20deg)"};
  }

  &:hover {
    &:after {
      width: 100%;
    }
  }
`;

export default Menu;
