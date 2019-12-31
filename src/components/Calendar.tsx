import React, { useState, useRef, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import moment from "moment";
import styled, { css } from "styled-components";
import { exhibitions, schedules, PostData, TRANSITION_DURATION, TransitionProp } from "../App";

const today = moment();

const days: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

interface Props {
  type: "exhibitions" | "schedule";
}

const Calendar: React.FC<Props> = props => {
  const daysSelectorRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<number>(today.date());
  const [selectedMonth] = useState<number>(today.month() + 1);

  useEffect(() => {
    if (daysSelectorRef.current) {
      daysSelectorRef.current.scrollTo({
        behavior: "smooth",
        left: daysSelectorRef.current.clientWidth * (selectedDay / 7)
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
    const selectedDate = moment(`2019/${selectedMonth}/${selectedDay}`);

    switch (props.type) {
      case "exhibitions":
        return exhibitions.filter(
          post =>
            moment(selectedDate).isAfter(post.start) &&
            moment(selectedDate).isBefore(post.finish)
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
    <Wrapper>
      <Month>{selectedMonth}月</Month>
      <DateSelectorWrap>
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
      <ArticlesWrap>
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

const Wrapper = styled.div`
  width: 593px;
  height: 100vh;
  border-left: solid 1px #c0c0c0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  padding: 122px 0 63px 0;
  box-sizing: border-box;
`;

const Month = styled.p`
  font-size: 28px;
  color: #707070;
  text-align: center;
`;

const DateSelectorWrap = styled.div`
  width: 481px;
  display: flex;
  align-items: center;
  margin: 84px auto;
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
  margin-left: 85px;
  width: 100%;
`;

const ArticleName = styled.dd`
  font-size: 18px;
  color: #707070;
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
