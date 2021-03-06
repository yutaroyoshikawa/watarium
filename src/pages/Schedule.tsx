import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { TransitionProp, StyledWrapProp } from "../commons/types";
import { schedules } from "../commons/maps";
import { useQuery } from "../commons/hooks";
import Calendar from "../components/Calendar";

interface Props extends TransitionProp {}

const useSchedule = (): number | null => {
  const query = useQuery();
  const scheduleName = query.get("name");
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const filteredIndex = schedules.findIndex(
      schedules =>
        `${schedules.title}${schedules.subtitle ? schedules.subtitle : ""}` ===
        scheduleName
    );
    filteredIndex !== -1 ? setIndex(filteredIndex) : setIndex(null);
  }, [scheduleName]);

  return index;
};

const Schedule: React.FC<Props> = props => {
  const [isActiveCalender, setIsActiveCalender] = useState<boolean>(false);
  const scheduleIndex = useSchedule();
  const latestSchedule = schedules.sort((a, b) =>
    a.start > b.start ? -1 : 1
  )[0];

  return (
    <Wrap
      isActiveCalendar={isActiveCalender}
      duration={props.duration}
      transitionStatus={props.transitionStatus}
    >
      <Calendar
        type="schedule"
        isActive={isActiveCalender}
        onSwitch={setIsActiveCalender}
      />
      {scheduleIndex !== null ? (
        <ScheduleWrap
          transitionStatus={props.transitionStatus}
          duration={props.duration}
        >
          <Title>
            {schedules[scheduleIndex].title}
            <SubTitle>{schedules[scheduleIndex].subtitle}</SubTitle>
          </Title>
          <SumbnailWrapper>
            <Sumbnail
              src={schedules[scheduleIndex].sumbnail}
              alt={`${schedules[scheduleIndex].title}${schedules[scheduleIndex].subtitle}`}
            />
          </SumbnailWrapper>
          <OverView>{schedules[scheduleIndex].overview}</OverView>
        </ScheduleWrap>
      ) : (
        <ScheduleWrap
          transitionStatus={props.transitionStatus}
          duration={props.duration}
        >
          <Title>
            {latestSchedule.title}
            <SubTitle>{latestSchedule.subtitle}</SubTitle>
          </Title>
          <SumbnailWrapper>
            <Sumbnail
              src={latestSchedule.sumbnail}
              alt={`${latestSchedule.title}${latestSchedule.subtitle}`}
            />
          </SumbnailWrapper>
          <OverView>{latestSchedule.overview}</OverView>
        </ScheduleWrap>
      )}
    </Wrap>
  );
};

export default Schedule;

const Wrap = styled.div`
  box-sizing: border-box;
  @media screen and (max-width: 1900px) and (min-width: 1024px) {
    padding: 0 130px 0 30px;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    padding: 0;
  }

  ${(props: StyledWrapProp) =>
    props.isActiveCalendar &&
    css`
      @media screen and (min-width: 1901px) {
        padding-right: 630px;
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

const ScheduleWrap = styled.div`
  width: 100%;
  max-width: 965px;
  margin: 218px auto;

  @media screen and (max-width: 633px) {
    margin: 100px auto;
  }

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

const Title = styled.h1`
  font-size: 58px;
  color: #707070;

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    margin: 0 50px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 633px) {
    font-size: 30px;
  }
`;

const SubTitle = styled.span`
  font-size: 40px;
  color: #707070;
  display: block;
  margin-top: 30px;
  line-height: 50px;

  @media screen and (max-width: 633px) {
    font-size: 20px;
    line-height: 40px;
    margin-top: 20px;
  }
`;

const SumbnailWrapper = styled.figure`
  margin: 167px 0 53px 0;

  @media screen and (max-width: 633px) {
    margin: 100px 0 53px 0;
  }
`;

const Sumbnail = styled.img`
  width: 100%;
  height: 361px;
  object-fit: cover;
`;

const OverView = styled.p`
  color: #707070;
  font-size: 17px;
  text-align: justify;
  line-height: 40px;

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    margin: 0 50px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 633px) {
    margin: 0 20px;
  }
`;
