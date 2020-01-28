import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { TransitionProp } from "../commons/types";

interface Prop extends TransitionProp {}

const MembershipForm: React.FC<Prop> = props => {
  const history = useHistory();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    history.push("/membership");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    history.push("/membership");
  };

  return (
    <Wrapper
      duration={props.duration}
      transitionStatus={props.transitionStatus}
    >
      <CloseButton onClick={onClose} />
      <Form onSubmit={onSubmit}>
        <FormTitle>メンバーシップ申込フォーム</FormTitle>
        <MembershipWrapper>
          <MembershipItem>
            <MembershipName>ART PASS</MembershipName>
            <MembershipRuby>アートパス</MembershipRuby>
            <MembershipPlans>
              <PlanWrapper>
                <PlanSpan>1年間</PlanSpan>
                <PlanPrice>¥5,000</PlanPrice>
              </PlanWrapper>
              <PlanWrapper>
                <PlanSpan>3年間</PlanSpan>
                <PlanPrice>¥12,000</PlanPrice>
              </PlanWrapper>
            </MembershipPlans>
          </MembershipItem>
          <MembershipItem>
            <MembershipName>SUPPORT</MembershipName>
            <MembershipRuby>サポート</MembershipRuby>
            <MembershipPlans>
              <PlanWrapper>
                <PlanSpan>1年間</PlanSpan>
                <PlanPrice>¥25,000</PlanPrice>
              </PlanWrapper>
              <PlanWrapper>
                <PlanSpan>3年間</PlanSpan>
                <PlanPrice>¥60,000</PlanPrice>
              </PlanWrapper>
            </MembershipPlans>
          </MembershipItem>
        </MembershipWrapper>
        <InputLabel>
          名前
          <TextInput type="text" />
        </InputLabel>
        <InputLabel>
          申込日
          <TextInput type="text" />
        </InputLabel>
        <InputLabel>
          ご住所
          <TextInput type="text" />
        </InputLabel>
        <InputLabel>
          Tel
          <TextInput type="text" />
        </InputLabel>
        <SubmitButton type="submit">送信</SubmitButton>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1010;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;

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

const FormTitle = styled.h2`
  color: #fff;

  @media screen and (min-width: 1024px) {
    font-size: 25px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 25px;
  }
  @media screen and (max-width: 633px) {
    font-size: 15px;
  }
`;

const MembershipWrapper = styled.ul`

  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    margin: 133px auto;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    display: flex;
    justify-content: center;
    margin: 133px auto;
  }
  @media screen and (max-width: 633px) {
    margin: 80px auto;
  }
`;

const MembershipItem = styled.li`
  @media screen and (max-width: 633px) {
    display: flex;
    justify-content: center;
    flex-direction: column;

    :last-child {
      margin-top: 52px;
    }
  }
`;

const MembershipName = styled.span`
  display: block;
  margin: auto;
  color: #fff;
  font-variant-ligatures: common-ligatures;
  font-weight: normal;
  text-align: center;

  @media screen and (min-width: 1024px) {
    font-size: 35px;
    letter-spacing: -4px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 35px;
    letter-spacing: -4px;
  }
  @media screen and (max-width: 633px) {
    font-size: 22px;
    letter-spacing: -2px;
  }
`;

const MembershipRuby = styled.span`
  width: 100%;
  color: #fff;
  font-variant-ligatures: none;
  letter-spacing: 0;
  position: relative;
  top: -1px;
  display: inline-block;
  text-align: center;

  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 16px;
  }
  @media screen and (max-width: 633px) {
    font-size: 10px;
  }
`;

const MembershipPlans = styled.dl`
  display: grid;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 180px 180px;
    margin-top: 30px;
    grid-column-gap: 28px;
    :last-child {
      margin-left: 100px;
    }
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    grid-template-rows: 180px 180px;
    margin-top: 30px;
    grid-row-gap: 28px;
    :last-child {
      margin-left: 100px;
    }
  }
  @media screen and (max-width: 633px) {
    margin: 30px auto 0 auto;
    grid-template-columns: 100px 100px;
    grid-column-gap: 18px;
  }
`;

const PlanWrapper = styled.div`
  box-sizing: border-box;
  background-color: #F7BC77;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  transition: background-color 300ms ease;

  &:hover {
    background-color: #c0c0c0;
  }

  @media screen and (min-width: 1024px) {
    width: 180px;
    height: 180px;
    padding: 20px 35px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    width: 180px;
    height: 180px;
    padding: 20px 35px;
  }
  @media screen and (max-width: 633px) {
    width: 100px;
    height: 100px;
    padding: 20px 15px;
  }
`;

const PlanSpan = styled.dt`
  color: #fff;

  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 16px;
  }
  @media screen and (max-width: 633px) {
    font-size: 10px;
  }
`;

const PlanPrice = styled.dd`
  color: #fff;
  text-align: left;

  @media screen and (min-width: 1024px) {
    font-size: 30px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 30px;
  }
  @media screen and (max-width: 633px) {
    font-size: 19px;
  }
`;

const Form = styled.form`
  @media screen and (min-width: 1024px) {
    width: 920px;
    margin: 229px auto;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    width: 100%;
    margin: 229px 20px;
  }

  @media screen and (max-width: 633px) {
    width: 100%;
    margin: 229px auto;
    padding: 0 10px;
    box-sizing: border-box;
  }
`;

const InputLabel = styled.label`
  color: #fff;
  font-size: 20px;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  margin: 5px 0 79px 0;
  height: 53px;
  font-size: 20px;
  color: #707070;
  padding: 0 10px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 265px;
  height: 76px;
  border: none;
  background: #fff;
  color: #707070;
  font-size: 25px;
  margin: 0 auto;
  display: block;
  cursor: pointer;
`;

const bar = css`
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #fff;
  border-radius: 2px;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: fixed;
  z-index: 1011;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  &::before {
    ${bar}
    transform: rotate(45deg);
  }

  &::after {
    ${bar}
    transform: rotate(-45deg);
  }

  @media screen and (min-width: 1024px) {
    width: 63px;
    height: 63px;
    top: 105px;
    right: 103px;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    width: 63px;
    height: 63px;
    top: 105px;
    right: 103px;
  }

  @media screen and (max-width: 633px) {
    width: 33px;
    height: 33px;
    top: 97px;
    right: 19px;
  }
`;

export default MembershipForm;
