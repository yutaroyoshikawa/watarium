import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import Calendar from "../components/Calendar";
import { TransitionProp, exhibitions } from "../App";
import moment from "moment";

interface Props extends TransitionProp {}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const useEchibition = (): number | null => {
  const query = useQuery();
  const exhibitionName = query.get("name");
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const filteredIndex = exhibitions.findIndex(
      exhibition =>
        `${exhibition.title}${
          exhibition.subtitle ? exhibition.subtitle : ""
        }` === exhibitionName
    );
    filteredIndex !== -1 ? setIndex(filteredIndex) : setIndex(null);
  }, [exhibitionName]);

  return index;
};

const Exhibitions: React.FC<Props> = props => {
  const exhibitionIndex = useEchibition();
  const latestExhibition = exhibitions.sort((a, b) =>
    a.start > b.start ? -1 : 1
  )[0];

  return (
    <>
      <Calendar type="exhibitions" />
      {exhibitionIndex !== null ? (
        <Wrap
          transitionStatus={props.transitionStatus}
          duration={props.duration}
        >
          <SumbnailWrap>
            <Sumbnail
              src={exhibitions[exhibitionIndex].sumbnail}
              alt={`${exhibitions[exhibitionIndex].title}${exhibitions[exhibitionIndex].subtitle}`}
            />
            <InfoCard>
              <Title>
                {exhibitions[exhibitionIndex].title}
                <SubTitle>{exhibitions[exhibitionIndex].subtitle}</SubTitle>
              </Title>
              <Date>
                {moment(exhibitions[exhibitionIndex].start).format(
                  "YYYY / MM / DD (dd)"
                )}{" "}
                -{" "}
                {moment(exhibitions[exhibitionIndex].finish).format(
                  "YYYY / MM / DD (dd)"
                )}
              </Date>
            </InfoCard>
          </SumbnailWrap>
          <ExhibitionContent>
            {exhibitions[exhibitionIndex].overview}
          </ExhibitionContent>
        </Wrap>
      ) : (
        <Wrap
          transitionStatus={props.transitionStatus}
          duration={props.duration}
        >
          <SumbnailWrap>
            <Sumbnail
              src={latestExhibition.sumbnail}
              alt={`${latestExhibition.title}${latestExhibition.subtitle}`}
            />
            <InfoCard>
              <Title>
                {latestExhibition.title}
                <SubTitle>{latestExhibition.subtitle}</SubTitle>
              </Title>
              <Date>
                {moment(latestExhibition.start).format("YYYY / MM / DD (dd)")} -{" "}
                {moment(latestExhibition.finish).format("YYYY / MM / DD (dd)")}
              </Date>
            </InfoCard>
          </SumbnailWrap>
          <ExhibitionContent>{latestExhibition.overview}</ExhibitionContent>
        </Wrap>
      )}
    </>
  );
};

export default Exhibitions;

const Wrap = styled.div`
  padding: 218px 593px 218px 0;
  margin: 0 auto;
  box-sizing: border-box;

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
  color: #9d9d9d;
  line-height: 40px;
  padding: 0 80px 0 100px;
  text-align: justify;
  box-sizing: border-box;
`;
