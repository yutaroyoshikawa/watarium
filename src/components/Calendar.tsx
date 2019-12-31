import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

const Calendar: React.FC = () => {
  const daysSelectorRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);

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

  return (
    <Wrapper>
      <Month>12月</Month>
      <DateSelectorWrap>
        <PreviusWeek onClick={onClickPrevius}>
          <PreviusArrow
            type="image/svg+xml"
            data={`${process.env.PUBLIC_URL}/img/days_arrow.svg`}
          />
        </PreviusWeek>
        <DaysWrap ref={daysSelectorRef}>
          {[...Array(31)].map((_, index) => (
            <Date
              key={index}
              onClick={e => onSelectDay(e, index + 1)}
              isSelected={index + 1 === selectedDay}
            >
              {index + 1}
            </Date>
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
        <ArticleItem>
          <ArticleName>
            小沢朝江　庭園倶楽部「数寄屋造りに学ぶ　数寄の空間学」
          </ArticleName>
          <ArticleTime>19:00-21:00</ArticleTime>
        </ArticleItem>
        <ArticleItem>
          <ArticleName>
            小沢朝江　庭園倶楽部「数寄屋造りに学ぶ　数寄の空間学」
          </ArticleName>
          {/* <ArticleTime>19:00-21:00</ArticleTime> */}
        </ArticleItem>
        <ArticleItem>
          <ArticleName>
            小沢朝江　庭園倶楽部「数寄屋造りに学ぶ　数寄の空間学」
          </ArticleName>
          <ArticleTime>19:00-21:00</ArticleTime>
        </ArticleItem>
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

interface DateProp {
  isSelected: boolean;
}

const Date = styled.div`
  cursor: pointer;
  transition: all 300ms ease;
  font-size: 17px;

  ${(props: DateProp) =>
    props.isSelected
      ? css`
          color: #707070;
          transform: scale(2);
        `
      : css`
          color: #a0a0a0;
          transform: scale(1);
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

const ArticleItem = styled.div`
  box-sizing: border-box;

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
