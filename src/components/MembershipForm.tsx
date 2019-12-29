import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { TransitionProp } from '../App';

interface Prop extends TransitionProp{};

const MembershipForm: React.FC<Prop> = props => {
  const history = useHistory();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    }
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
    <Wrapper duration={props.duration} transitionStatus={props.transitionStatus}>
      <CloseButton onClick={onClose} />
      <Form onSubmit={onSubmit}>
        <FormTitle>メンバーシップ申込フォーム</FormTitle>
        <MembershipWrapper>
          <li>
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
          </li>
          <li>
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
          </li>
        </MembershipWrapper>
        <InputLabel>
          名前
          <TextInput type="text"/>
        </InputLabel>
        <InputLabel>
          申込日
          <TextInput type="text"/>
        </InputLabel>
        <InputLabel>
          ご住所
          <TextInput type="text"/>
        </InputLabel>
        <InputLabel>
          Tel
          <TextInput type="text"/>
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
  font-size: 25px;
`;

const MembershipWrapper = styled.ul`
  margin: 133px auto;
  display: flex;
  justify-content: space-between;
`;

const MembershipName = styled.span`
  display: block;
  margin: auto;
  font-size: 35px;
  color: #fff;
  letter-spacing: -4px;
  font-variant-ligatures: common-ligatures;
  font-weight: normal;
  text-align: center;
`;

const MembershipRuby = styled.span`
  width: 100%;
  font-size: 16px;
  color: #fff;
  font-variant-ligatures: none;
  letter-spacing: 0;
  position: relative;
  top: -1px;
  display: inline-block;
  text-align: center;
`;

const MembershipPlans = styled.dl`
  display: grid;
  grid-template-columns: 180px 180px;
  grid-column-gap: 28px;
  margin-top: 30px;
`;

const PlanWrapper = styled.div`
  width: 180px;
  height: 180px;
  padding: 20px 35px;
  box-sizing: border-box;
  background-color: #fff;
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
`;

const PlanSpan = styled.dt`
  font-size: 16px;
  color: #707070;
`;

const PlanPrice = styled.dd`
  font-size: 30px;
  color: #707070;
  text-align: left;
`;

const Form = styled.form`
  width: 920px;
  margin: 229px auto;
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
  width: 63px;
  height: 63px;
  cursor: pointer;
  position: fixed;
  top: 105px;
  right: 103px;
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
`;

export default MembershipForm;
