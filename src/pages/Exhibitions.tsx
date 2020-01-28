import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Calendar from "../components/Calendar";
import { exhibitions } from "../commons/maps";
import { TransitionProp, StyledWrapProp } from "../commons/types";
import moment from "moment";
import { useQuery } from "../commons/hooks";

interface Props extends TransitionProp {}

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
  const [isActiveCalendar, setIsActiveCalender] = useState<boolean>(false);
  const exhibitionIndex = useEchibition();
  const latestExhibition = exhibitions.sort((a, b) =>
    a.start > b.start ? -1 : 1
  )[0];

  return (
    <>
      <Calendar
        type="exhibitions"
        isActive={isActiveCalendar}
        onSwitch={setIsActiveCalender}
      />
      {exhibitionIndex !== null ? (
        <Wrap
          transitionStatus={props.transitionStatus}
          duration={props.duration}
          isActiveCalendar={isActiveCalendar}
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
          isActiveCalendar={isActiveCalendar}
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
  box-sizing: border-box;
  transition: padding 500ms ease;

  @media screen and (max-width: 1900px) and (min-width: 1024px) {
    margin: 0 auto;
    padding: 10vw 100px 10vw 0;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    margin: 25vh auto;
    overflow: hidden;
  }

  ${(props: StyledWrapProp) =>
    props.isActiveCalendar
      ? css`
          @media screen and (min-width: 1901px) {
            padding: 218px 593px 218px 0;
          }
        `
      : css`
        @media screen and (min-width: 1024px) {
          padding: 218px 164px 218px 0;
        }
        `}

  ${(props: StyledWrapProp) => {
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
  @media screen and (max-width: 1900px) and (min-width: 1025px) {
    transform: translateX(60px);
    display: flex;
    justify-content: center;
    transform: translateX(100px);
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: 240px;
    display: flex;
    justify-content: center;
    transform: translateX(100px);
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    /* margin-bottom: 120px; */
    transform: translate(100px, -100px);
  }

  @media screen and (max-width: 633px) {

  }
`;

const InfoCard = styled.div`
  padding: 50px;
  box-sizing: border-box;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (min-width: 1024px) {
    width: 50vw;
    height: 245px;
    max-width: 749px;
    min-width: 512px;
    transform: translate(-9vw, 22vw);
    box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    position: absolute;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    width: 50vw;
    height: 245px;
    max-width: 749px;
    min-width: 512px;
    transform: translate(-9vw, -9vw);
    box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    /* position: absolute; */
  }

  @media screen and (max-width: 366px) {
    width: 100%;
    height: 150px;
  }
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

  @media screen and (max-width: 1023px) and (min-width: 632px) {
    font-size: 11px;
  }
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

  @media screen and (max-width: 1023px) and (min-width: 632px) {
    font-size: 11px;
  }
`;

const Sumbnail = styled.img`
  object-fit: cover;

  @media screen and (min-width: 1024px) {
    width: 45vw;
    max-width: 734px;
    min-width: 460px;
    height: 35vw;
    max-height: 621px;
    min-height: 380px;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    width: 45vw;
    max-width: 734px;
    min-width: 460px;
    height: 35vw;
    max-height: 621px;
    min-height: 380px;
  }

  @media screen and (max-width: 633px) {
    width: 100%;
    height: 271px;
  }
`;

const ExhibitionContent = styled.p`
  max-width: 990px;
  font-size: 16px;
  color: #9d9d9d;
  text-align: justify;
  box-sizing: border-box;

  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    padding: 0 40px;
    line-height: 40px;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    margin: 0 auto;
    padding: 0 50px;
    line-height: 40px;
  }

  @media screen and (max-width: 366px) {
    line-height: 30px;
    font-size: 13px;
    margin: 0 auto;
    padding: 0 20px;
  }
`;
