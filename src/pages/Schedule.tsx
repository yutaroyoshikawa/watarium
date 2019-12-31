import React from 'react';
import styled from 'styled-components';
import { TransitionProp } from '../App';
import Calendar from "../components/Calendar";

interface Props extends TransitionProp {};

const Schedule: React.FC<Props> = () => {
  return (
    <Wrap>
      <Calendar />
      <ScheduleWrap>
        <Title>
          小沢朝江　庭園倶楽部
          <SubTitle>
          「数寄屋造りに学ぶ　数寄の空間学」
          </SubTitle>
        </Title>
        <SumbnailWrapper>
          <Sumbnail src={`${process.env.PUBLIC_URL}/img/sample.jpg`} alt="sample" />
        </SumbnailWrapper>
        <OverView>
          観光立国のスローガンは、住んでよし・訪れてよしのまちづくりである。私たちが旅するのは、別に奇異な風景が目当てではない。ただ便利で機能的なビジネス都市の、それこそ工業製品で埋め尽くされた無機的で画一的な風景ではもちろんない。その土地を訪ねてこそ出会い、味合える”地域らしさ”が実感できる風景世界を求めてのことである。自然的歴史的風土の基盤の上に、その地をわがふるさととしてこよなく愛する人々の生活模様がくりひろげられ、その国、その地方、その地域、その場所の固有のランドスケープが私たちビジターに個性的で魅力的な風景体験を与えてくれるのである。2019年庭園倶楽部は、多様で多彩な世界のランドスケープ模様を覗いてみる。
        </OverView>
      </ScheduleWrap>
    </Wrap>
  );
};

export default Schedule;

const Wrap = styled.div`
  padding-right: 630px;
  box-sizing: border-box;
`;

const ScheduleWrap = styled.div`
  width: 965px;
  margin: 218px auto;
`;

const Title = styled.h1`
  font-size: 58px;
  color: #707070;
`;

const SubTitle = styled.span`
  font-size: 40px;
  color: #707070;
  display: block;
  margin-top: 30px;
`;

const SumbnailWrapper = styled.figure`
  margin: 167px 0 53px 0;
`;

const Sumbnail = styled.img`
  width: 100%;
  height: 361px;
  object-fit: cover;
`;

const OverView = styled.p`
  width: 100%;
  color: #707070;
  font-size: 17px;
  text-align: justify;
  line-height: 40px;
`;
