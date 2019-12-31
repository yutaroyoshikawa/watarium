import React from 'react';
import styled, { css } from 'styled-components';
import { TransitionProp, TRANSITION_DURATION } from '../App';

interface Props extends TransitionProp {}

const About: React.FC<Props> = props => {
  return (
    <Wrapper transitionStatus={props.transitionStatus} duration={TRANSITION_DURATION}>
      <Title>ワタリウム美術館</Title>
      <AboutContent>
      アートの「世界」は、いま文字通り「世界のアート」へと、広がろうとしています。そしてワタリウム美術館は、そうしたアートの発展の中心の一つをなしていると、わたしは考えています。いま、世界の至る所で多くの人々が求めてやまないものを、ワタリウム美術館は最も高いレベルで、しかも極めて洗練された方法で、実現しているのです。
ワタリウム美術館ははやくもその出発点から、山の頂きを見つめていました。このことは、美術館の設計のために建築家マリオ・ボッタを招いた決断に、すでに見ることができます。また、展覧会作りの世界的な専門家を招き、コンテンポラリー・アートの発展に国際的に貢献しているアーティストの参加を実現したことからも明らかです。東京という土地に根を下ろした活動でありながら、閉じこもった地域主義に陥ることなく活動を続けているのです。
こうした極めて高い水準で、国際的なアートにおける日本の位置の再検討を迫る場が、出現しつつあるのです。最高の物さしを選んだことは、最も厳密な判断を下す事だけでなく、最高の挑戦を生み出す事をも意味するのです。
美術館の選択としてこれまでに採り上げたアーティストのリストから浮かび上がってきたのは、ワタリウムがはっきり日本に基盤をおいている事です。そして同時にワタリウム美術館は、どこの土地であれ、重要だと考えられているものであればすべてを展覧会として紹介しています。閉鎖的な「地域主義的」という言葉でも、「国際的」という言葉でも、くくることはできません。それは、独自の文化が育んだ感性にもとづいて世界との絆を求める、日本の選択の現れなのです。
また一方、ワタリウム美術館は、日本やアジアのアーティストについても密度の高いリサーチを行い、丹念な関係作りをしています。美術館が行う提案全体の中で、欠くことのできない部分を構成する可能性を、アーティストたちは与えられているのです。
こうして、ワタリウム美術館は、世界のあらゆる土地の人が耳を傾ける、ひとつの声になりつつあります。いまを超えて、いつか日本がワタリウム美術館にさらなる感謝の言葉を贈る日がやって来ることでしょう。
      </AboutContent>
      <Access>アクセス</Access>
      <GoogleMap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.2547244750767!2d139.71116941585285!3d35.67072943815407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c98e859ff5d%3A0xb580c58783339d45!2z44Ov44K_44Oq44Km44Og576O6KGT6aSo!5e0!3m2!1sja!2sjp!4v1577334924990!5m2!1sja!2sjp" />
      <Address>
        〒150-0001 東京都渋谷区神宮前3-7-6
      </Address>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 328px 0 116px 0;
  width: 995px;
  margin: 0 auto;
  ${(props: TransitionProp) => {
    switch (props.transitionStatus) {
      case 'entering':
        return css`
          opacity: 0;
        `
      case 'entered':
        return css`
          opacity: 1;
          transition: opacity ${props.duration}ms ease;
        `
      case 'exited':
        return css`
          opacity: 1;
        `
      case 'exiting':
        return css`
          opacity: 0;
          transition: opacity ${props.duration}ms ease;
        `
    }
  }}
`

const Title = styled.h1`
  font-size: 25px;
  color: #9D9D9D;
`;

const AboutContent = styled.p`
  font-size: 16px;
  color: #9D9D9D;
  line-height: 40px;
  margin: 161px 0;
  text-align: justify;
`;

const GoogleMap = styled.iframe`
  width: 100%;
  height: 352px;
  border: 0;
  margin: 161px 0 54px 0;
`;

const Access = styled.h2`
  color: #9D9D9D;
  font-size: 25px;
`;

const Address = styled.address`
  color: #9D9D9D;
  font-size: 16px;
`;

export default About;
