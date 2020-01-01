import React, { useState, useRef, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import moment from "moment";
import styled, { css, keyframes } from "styled-components";
import { exhibitions, schedules, PostData, TRANSITION_DURATION, TransitionProp } from "../App";

const today = moment();

const days: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

interface Props {
  type: "exhibitions" | "schedule";
  isActive: boolean;
  onSwitch: (isActive: boolean) => void;
}

const Calendar: React.FC<Props> = props => {
  const daysSelectorRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<number>(today.date());
  const [selectedMonth] = useState<number>(today.month() + 1);

  useEffect(() => {
    if (daysSelectorRef.current) {
      daysSelectorRef.current.scrollTo({
        behavior: "auto",
        left: daysSelectorRef.current.clientWidth * (Math.floor(selectedDay / 7))
      });
    }    
    // eslint-disable-next-line
  }, []);

  const onSelectDay = (e: React.MouseEvent<HTMLDivElement>, day: number) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });

    setSelectedDay(day);
  };

  const onClickNext = () => {
    if (daysSelectorRef.current) {
      const scrollLeft = daysSelectorRef.current.scrollLeft;
      const selectorWidth = daysSelectorRef.current.clientWidth;

      daysSelectorRef.current.scrollTo({
        behavior: "smooth",
        left: scrollLeft + selectorWidth - 20
      });
    }
  };

  const onClickPrevius = () => {
    if (daysSelectorRef.current) {
      const scrollLeft = daysSelectorRef.current.scrollLeft;
      const selectorWidth = daysSelectorRef.current.clientWidth;

      daysSelectorRef.current.scrollTo({
        behavior: "smooth",
        left: scrollLeft - selectorWidth + 20
      });
    }
  };

  const filterItems = (): PostData[] => {
    const selectedDate = moment(`${today.year()}/${selectedMonth}/${selectedDay}`);

    switch (props.type) {
      case "exhibitions":
        return exhibitions.filter(
          post =>
            moment(selectedDate).isAfter(moment(post.start)) &&
            moment(selectedDate).isBefore(moment(post.finish))
        );
      case "schedule":
        return schedules.filter(
          post =>
            moment(selectedDate).isAfter(post.start) &&
            moment(selectedDate).isBefore(post.finish)
        );
    }
  };

  return (
    <Wrapper onMouseEnter={() => props.onSwitch(true)} onMouseLeave={() => props.onSwitch(false)} onClick={() => props.onSwitch(true)} isActive={props.isActive}>
      <Month>{selectedMonth}月</Month>
      <Day isActive={props.isActive}>{selectedDay}</Day>
      <DateSelectorWrap isActive={props.isActive}>
        <PreviusWeek onClick={onClickPrevius}>
          <PreviusArrow
            type="image/svg+xml"
            data={`${process.env.PUBLIC_URL}/img/days_arrow.svg`}
          />
        </PreviusWeek>
        <DaysWrap ref={daysSelectorRef}>
          {[...Array(days[selectedMonth - 1])].map((_, index) => (
            <DateTime
              key={index}
              onClick={e => onSelectDay(e, index + 1)}
              isSelected={index + 1 === selectedDay}
            >
              {index + 1}
            </DateTime>
          ))}
        </DaysWrap>
        <NextWeek onClick={onClickNext}>
          <NextArrow
            type="image/svg+xml"
            data={`${process.env.PUBLIC_URL}/img/days_arrow.svg`}
          />
        </NextWeek>
      </DateSelectorWrap>
      <ArticlesWrap isActive={props.isActive}>
        <TransitionGroup>
          {filterItems().map(item => (
            <CSSTransition
              key={item.id}
              timeout={TRANSITION_DURATION}
              unmountOnExit={true}
            >
              {status => (
                <ArticleItem
                  to={`/${props.type}?name=${item.title}${
                    item.subtitle ? item.subtitle : ""
                  }`}
                  transitionStatus={status}
                  duration={TRANSITION_DURATION}
                  onClick={() => props.onSwitch(false)}
                >
                  <ArticleName>
                    {item.title}
                    {item.subtitle}
                  </ArticleName>
                  {props.type === "schedule" && (
                    <ArticleTime>
                      {moment(item.start).format("hh:mm")} -{" "}
                      {moment(item.finish).format("hh:mm")}
                    </ArticleTime>
                  )}
                </ArticleItem>
              )}
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ArticlesWrap>
    </Wrapper>
  );
};

export default Calendar;

interface CalendarProps {
  isActive: boolean;
}

const Wrapper = styled.div`
  height: 100vh;
  border-left: solid 1px #c0c0c0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  padding: 122px 0 63px 0;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  transition: all 500ms ease;

  ${(props: CalendarProps) => props.isActive
      ? css`
        width: 593px;
        @media screen and (max-width: 1800px) {
          border-left: none;
          box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);
        }
      `
      : css`
        width: 100px;
        cursor: pointer;
      `
  }
`;

const Month = styled.p`
  font-size: 28px;
  color: #707070;
  text-align: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Day = styled.p`
    font-size: 22px;
    color: #a0a0a0;
    text-align: center;
    margin-top: 70px;
    opacity: 0;
    animation: ${fadeIn} 500ms ease 1 forwards;
    animation-delay: 500ms;

    ${(props: CalendarProps) => props.isActive && css`
          display: none;
          pointer-events: none;
        `
    }
`;

const DateSelectorWrap = styled.div`
  width: 481px;
  display: flex;
  align-items: center;
  margin: 84px auto;
  transform: opacity 500ms ease;

  ${(props: CalendarProps) => props.isActive
      ? css`
        opacity: 1;
      `
      : css`
        opacity: 0;
        pointer-events: none;
      `
  }
`;

const DaysWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  -ms-overflow-style: none;
  margin: 0 40px;
  padding: 10px 0;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface DateTimeProp {
  isSelected: boolean;
}

const DateTime = styled.div`
  transition: all 300ms ease;
  font-size: 17px;

  ${(props: DateTimeProp) =>
    props.isSelected
      ? css`
          color: #707070;
          transform: scale(2);
        `
      : css`
          color: #a0a0a0;
          transform: scale(1);
          cursor: pointer;
          &:hover {
            color: #808080;
            transform: scale(1.5);
          }
        `}

  &:not(:last-child) {
    margin-right: 42px;
  }
`;

const NextWeek = styled.button`
  width: 25px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const NextArrow = styled.object`
  width: 100%;
  transform: scale(2);
  pointer-events: none;
`;

const PreviusWeek = styled.button`
  width: 25px;
  transform: rotate(180deg);
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const PreviusArrow = styled.object`
  width: 100%;
  transform: scale(2);
  pointer-events: none;
`;

const ArticlesWrap = styled.dl`
  margin: 0 50px 0 85px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${(props: CalendarProps) => !props.isActive && css`
      display: none;
      pointer-events: none;
    `
  }
`;

const ArticleName = styled.dd`
  font-size: 18px;
  color: #707070;
  display: inline;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ArticleTime = styled.dt`
  font-size: 14px;
  margin-top: 10px;
  color: #a0a0a0;
`;

const ArticleItem = styled(Link)`
  box-sizing: border-box;

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

  &:first-child {
    padding-bottom: 30px;
  }

  &:last-child {
    padding-top: 30px;
  }

  &:not(:first-child):not(:last-child) {
    padding: 30px 0;
  }

  &:not(:last-child) {
    border-bottom: solid 1px #e0e0e0;
  }

  &:hover ${ArticleName}, ${ArticleTime} {
    color: #404040;
  }
`;
