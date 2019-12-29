import React from 'react';
import styled from 'styled-components';
import { TransitionProp } from '../App';

interface Prop extends TransitionProp {};

const Home: React.FC<Prop> = prop => {
  return (
    <Wrap>
      <InfoCard>
        <Info>
          <Title>
            フィリップパレーノ展
            <SubTitle>オブジェが語り始めること</SubTitle>
          </Title>
          <Date>2019 / 11 / 2 (土) - 2020 / 3 / 22 (日)</Date>
        </Info>
        <ArrowWrap>
          <Arrow data={`${process.env.PUBLIC_URL}/img/arrow.svg`} type="image/svg+xml" />
        </ArrowWrap>
      </InfoCard>
      <Sumbnail src={`${process.env.PUBLIC_URL}/img/sample.jpg`} alt="フィリップパレーノ展" />
      <NavWrapper>
        <NavItem />
      </NavWrapper>
    </Wrap>
  );
};

const Wrap = styled.article`
  width: 100%;
  height: 100vh;
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
  height: 100vh;
  width: calc(100% - 30vw);
  object-fit: cover;
  position: absolute;
  right: 0;
  z-index: 1;
  cursor: pointer;
  transition: box-shadow 300ms ease;

  &:hover {
    box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const InfoCard = styled.div`
  width: 749px;
  height: 245px;
  padding: 50px;
  box-sizing: border-box;
  box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 2;
  bottom: 23vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 300ms ease;

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

const Arrow = styled.object`
  width: 100%;
  fill: #a0a0a0;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #707070;
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: #707070;
  display: block;
  margin-top: 10px;
`;

const Date = styled.time`
  font-size: 20px;
  color: #707070;
`;

const NavWrapper = styled.div`
  position: absolute;
  bottom: 158px;
`;

const NavItem = styled.div`
  width: 23px;
  height: 23px;
  border: solid 3px #fff;
  border-radius: 50%;
  background-color: #fff;
`;

export default Home;
