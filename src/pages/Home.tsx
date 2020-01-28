import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { exhibitions } from "../commons/maps";
import { TransitionProp } from "../commons/types";
import moment from "moment";

interface Prop extends TransitionProp {}

const TRANSITION_DURATION = 4000;

const useSlideshow = (): [number, (index: number) => void] => {
  const [index, setIndex] = useState<number>(0);
  let timeout: number | undefined = undefined;

  const createTimeout = () => {
    timeout = window.setTimeout(() => {
      index < exhibitions.length - 1 ? setIndex(index + 1) : setIndex(0);
    }, TRANSITION_DURATION);
  };

  const removeTimeout = () => {
    window.clearTimeout(timeout);
    timeout = undefined;
  };

  useEffect(() => {
    if (timeout !== undefined) {
      removeTimeout();
    }
    createTimeout();

    return () => {
      removeTimeout();
    };
    // eslint-disable-next-line
  }, [index]);

  return [index, setIndex];
};

const Home: React.FC<Prop> = props => {
  const [index, setIndex] = useSlideshow();
  const history = useHistory();

  const onClickSumbnail = (
    e: React.MouseEvent<HTMLImageElement>,
    url: string
  ) => {
    e.preventDefault();
    history.push(url);
  };

  return (
    <Wrap transitionStatus={props.transitionStatus} duration={props.duration}>
      <CSSTransition
        key={exhibitions[index].id}
        timeout={props.duration}
        unmountOnExit={true}
      >
        {status => (
          <SumbnailWrapper
            transitionStatus={status}
            duration={props.duration}
            key={exhibitions[index].id}
          >
            <Sumbnail
              src={exhibitions[index].sumbnail}
              alt={exhibitions[index].title}
              onClick={e =>
                onClickSumbnail(
                  e,
                  `/exhibitions?name=${exhibitions[index].title}${
                    exhibitions[index].subtitle
                      ? exhibitions[index].subtitle
                      : ""
                  }`
                )
              }
            />
            <NavWrapper>
              {exhibitions.map((_, itemIndex) => (
                <NavItem
                  isSelected={index === itemIndex}
                  onClick={() => setIndex(itemIndex)}
                />
              ))}
            </NavWrapper>
            <InfoCard
              transitionStatus={status}
              duration={props.duration}
              to={`/exhibitions?name=${exhibitions[index].title}${
                exhibitions[index].subtitle ? exhibitions[index].subtitle : ""
              }`}
            >
              <Info>
                <Title>
                  {exhibitions[index].title}
                  <SubTitle>{exhibitions[index].subtitle}</SubTitle>
                </Title>
                <Date>
                  {moment(exhibitions[index].start).format(
                    "YYYY / MM / DD (ddd)"
                  )}{" "}
                  -{" "}
                  {moment(exhibitions[index].finish).format(
                    "YYYY / MM / DD (ddd)"
                  )}
                </Date>
              </Info>
              <ArrowWrap>
                <Arrow
                  data={`${process.env.PUBLIC_URL}/img/arrow.svg`}
                  type="image/svg+xml"
                />
              </ArrowWrap>
            </InfoCard>
          </SumbnailWrapper>
        )}
      </CSSTransition>
    </Wrap>
  );
};

const Wrap = styled(TransitionGroup)`
  width: 100%;
  height: 100vh;

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

const Info = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const ArrowWrap = styled.figure`
  width: 31px;
  transition: transform 300ms ease;
`;

const Sumbnail = styled.img`
  object-fit: cover;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
    filter: brightness(110%);
  }

  @media screen and (min-width: 1024px) {
    height: 100vh;
    width: 70vw;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    height: 564px;
    width: 100%;
  }

  @media screen and (max-width: 633px) {
    height: 271px;
  }
`;

const InfoCard = styled(Link)`
  padding: 50px;
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;
  transition: box-shadow 300ms ease;

  @media screen and (min-width: 1024px) {
    transform: translateX(-33vw);
    bottom: 23vh;
    width: 50vw;
    max-width: 749px;
    min-width: 512px;
    height: 245px;
    background-color: #fff;
  }

  @media screen and (max-width: 1900px) and (min-width: 1024px) {
    transform: translateX(-13vw);
    bottom: 23vh;
    width: 50vw;
    max-width: 749px;
    min-width: 512px;
    height: 245px;
    background-color: #fff;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    transform: translate(-70px, 70px);
    width: 50vw;
    max-width: 749px;
    min-width: 512px;
    height: 245px;
    background-color: #fff;
  }

  @media screen and (max-width: 633px) {
    width: 100%;
    transform: translateY(90%);
  }

  ${(props: TransitionProp) => {
    switch (props.transitionStatus) {
      case "entering":
        return css`
          @media screen and ()
          box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
        `;
      case "entered":
        return css`
          box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
        `;
      case "exited":
        return css`
          box-shadow: none;
          transition: none;
        `;
      case "exiting":
        return css`
          box-shadow: none;
          transition: none;
        `;
    }
  }}

  &:hover ${ArrowWrap} {
    transform: translateX(10px);
  }

  &:hover ${Sumbnail} {
    box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
  }

  &:hover {
    box-shadow: -2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  }
`;

interface NavItem {
  isSelected: boolean;
}

const NavItem = styled.div`
  width: 23px;
  height: 23px;
  border: solid 3px #fff;
  border-radius: 50%;
  transition: background-color 300ms ease;

  &:not(:last-child) {
    margin-right: 30px;
  }

  ${(props: NavItem) =>
    props.isSelected
      ? css`
          background-color: #000;
        `
      : css`
          cursor: pointer;
          background-color: #fff;
          &:hover {
            background-color: #a0a0a0;
          }
        `}
`;

const SumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  right: 0;
  z-index: 1;

  @media screen and (min-width: 1024px) {
    height: 100vh;
    width: calc(100% - 30vw);
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    height: 564px;
    width: 100%;
    margin-top: 20vh;
  }

  @media screen and (max-width: 633px) {
    height: 271px;
    width: 100%;
    margin-top: 90px;
  }

  ${(props: TransitionProp) => {
    switch (props.transitionStatus) {
      case "entering":
        return css``;
      case "entered":
        return css``;
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

  &:hover ${InfoCard} {
    box-shadow: -2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  }

  &:hover ${ArrowWrap} {
    transform: translateX(10px);
  }
`;

const Arrow = styled.object`
  width: 100%;
  fill: #a0a0a0;
  pointer-events: none;
`;

const slideIn = keyframes`
from {
  transform: translateY(15px);
  opacity: 0;
}
to {
  transform: translateY(0);
  opacity: 1;
}
`;

const Title = styled.h2`
  font-size: 28px;
  color: #707070;
  opacity: 0;
  animation: ${slideIn} 500ms ease 1 forwards;

  @media screen and (max-width: 633px) {
    font-size: 13px;
  }
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: #707070;
  display: block;
  margin-top: 10px;
  opacity: 0;
  animation: ${slideIn} 500ms ease 1 forwards;

  @media screen and (max-width: 633px) {
    font-size: 13px;
  }
`;

const Date = styled.time`
  font-size: 20px;
  color: #707070;
  opacity: 0;
  animation: ${slideIn} 500ms ease 1 forwards;
  animation-delay: 200ms;

  @media screen and (max-width: 633px) {
    font-size: 13px;
  }
`;

const NavWrapper = styled.div`
  position: relative;
  z-index: 3;
  display: flex;

  @media screen and (min-width: 1024px) {
    bottom: 30px;
    margin: 84px auto;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    bottom: -150px;
  }

  @media screen and (max-width: 633px) {
    bottom: -150px;
  }
`;

export default Home;
