import React from "react";
import styled, { keyframes } from "styled-components";
import Calendar from "../components/Calendar";
import { TransitionProp } from "../App";

interface Props extends TransitionProp {};

const Exhibitions: React.FC<Props> = props => {
  return (
    <>
      <Calendar />
      <Wrap>
        <SumbnailWrap>
          <Sumbnail src={`${process.env.PUBLIC_URL}/img/sample.jpg`} alt="sample" />
          <InfoCard>
            <Title>
            フィリップ・パレーノ展
            <SubTitle>
              オブジェが語り始めること
            </SubTitle>
            </Title>
            <Date>2019 / 11 / 2 (土) - 2020 / 3 / 22 (日)</Date>
          </InfoCard>
        </SumbnailWrap>
        <ExhibitionContent>
        同時代の重要なアーティストの一人、フィリップ・パレーノの日本初となる大掛かりな展覧会です。パレーノの特徴は、映像、彫刻、ドローイング、テキストなど多様な手法を用い、展覧会を一貫したひとつのメディアとして捉えていることです。つまり展覧会は一連の出来事が展開する空間であり、個々の作品の意味ではなく、「オブジェクト」として展覧会の可能性を探っていくと、展覧会はオープンスペースとなり、時に応じて変化するフォーマットとなります。展覧会に訪れることが、空間的・時間的境界や感覚的経験を伴う唯一無二の体験となることを目指しているのです。本展では、パレーノの代表作である白熱光が点滅する「マーキー」や、天井に張りつく風船「吹き出し」のほか、1995年にワタリウム美術館と伝説のキュレター、ヤン・フートがコラボレートした展覧会「水の波紋展」で制作した氷の「雪だるま」がその姿を新しくし登場します。無色透明なこれらの作品を通し、パレーノが見ている近未来の風景が広がるのでしょうか。最先端でありながら懐かしい、現れては消える不思議なパレーノワールドです。A key artist of his generation, Philippe Parreno has radically redefined the exhibition experience by taking it as a medium, placing its construction at the heart of his process. Working in a diverse range of media including film, sculpture, drawing, and text, Parreno conceives his exhibitions as a scripted space where a series of events unfold. He seeks to transform the exhibition visit into a singular experience that plays with spatial and temporal boundaries and the sensory experience of the visitor. For the artist, the exhibition is less a total work of art than a necessary interdependence that offers an ongoing series of open possibilities.In this exhibition, you may encount his masterpieces including Marquee made of lightbulbs and neons flickering, and Speech Bubbles which is balloon work stuck to a ceiling. And also Ice Man exhibited in Ripples across the Water in 1995, a exhibition by WATARI-UM collaborated with a legendary curator Jan Hoet, shall get renewed and reappear. Through these colorless and transparent works, we may witness a neo-futuristic landscape in Parreno’s eyes. This is a cutting-edge but also nostalgic, mysterious world of Parreno, which is here today and gone tomorrow.この展覧会は、1994年から2006年にかけて制作された作品-オブジェのプレゼンテーション、あるいは再構成である。タイトルはこれらの作品がつくられた年代を重ね合わせている。1994年の《しゃべる石》からスタートし、1995年、ワタリウム美術館により企画され、ヤン・フートがキュレーションした「水の波紋」展のために制作された《リアリティー・パークの雪だるま》、そして2007年に発表された最初の《マーキー》まで。これらの年代が過度に露出することで、このモチーフが誕生した。このモチーフにより、タイトルに「語る」という言葉が与えられた。ここに筋書きはない。そして始まりも終わりもない。ここで、オブジェたちは互いに会話しはじめる。それぞれのオブジェ同士には関係がある。カメラを通して、ワタリウム美術館周辺の気圧や風の方向などの細かな出来事にも 反応する。すべては空気の変化や換気に反応している。 オブジェたちは一緒になって、ここの状況をつくっていく。今、2019年11月1日から、一連の語りが完了する2020年3月22日まで。
        </ExhibitionContent>
      </Wrap>
    </>
  )
};

export default Exhibitions;

const Wrap = styled.div`
  padding: 218px 593px 218px 0;
  margin: 0 auto;
  box-sizing: border-box;
`;

const SumbnailWrap = styled.div`
  display: flex;
  justify-content: center;
  transform: translateX(100px);
  margin-bottom: 240px;
`;

const InfoCard = styled.div`
  width: 749px;
  height: 245px;
  padding: 50px;
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  transform: translate(-9vw, 420px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  cursor: pointer;
  box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
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
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: #707070;
  display: block;
  margin-top: 10px;
  opacity: 0;
  animation: ${slideIn} 500ms ease 1 forwards;
`;

const Date = styled.time`
  font-size: 20px;
  color: #707070;
  opacity: 0;
  animation: ${slideIn} 500ms ease 1 forwards;
  animation-delay: 200ms;
`;

const Sumbnail = styled.img`
  width: 734px;
  height: 621px;
  object-fit: cover;
`;

const ExhibitionContent = styled.p`
  width: 100%; 
  font-size: 16px;
  color: #9D9D9D;
  line-height: 40px;
  padding: 0 80px 0 100px;
  text-align: justify;
  box-sizing: border-box;
`;
