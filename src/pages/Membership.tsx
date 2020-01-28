import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import {
  TransitionGroup,
  CSSTransition,
  Transition
} from "react-transition-group";
import uuid from "uuid";
import { TransitionProp } from "../commons/types";
import { useQuery } from "../commons/hooks";
import MembershipForm from "../components/MembershipForm";

interface BenefitItem {
  id: string;
  label: string;
  isArtpass: boolean;
  isSupport: boolean;
}

const benefitItems: BenefitItem[] = [
  {
    id: uuid(),
    label: "メンバーカードのデザインが選べます",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "本人限りレセプションパーティーへご招待",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "展覧会にはいつでもフリーパス",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "同伴者３名が割引",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "講演会20%割引等",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "入会金50%割引",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "「展覧会ニュース＆レポート」をお届け",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "ワタリウム美術館企画の館外アートツアー",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "ワタリウム美術館映像ライブラリーをご覧いただけます",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "３年間会員継続で展覧会招待チケット３枚プレゼント",
    isArtpass: true,
    isSupport: true
  },
  {
    id: uuid(),
    label: "お買い物１０％割引",
    isArtpass: false,
    isSupport: true
  },
  {
    id: uuid(),
    label: "ご本人限りフリードリンクをご用意",
    isArtpass: false,
    isSupport: true
  }
];

type memberships = "artpass" | "support";

const useMembership = (
  membership: memberships
): [BenefitItem[], memberships, (state: memberships) => void] => {
  const [selectedMembership, setMembership] = useState<memberships>(membership);

  const filterBenefits = (): BenefitItem[] => {
    switch (selectedMembership) {
      case "artpass":
        return benefitItems.filter(item => item.isArtpass);
      case "support":
        return benefitItems.filter(item => item.isSupport);
    }
  };

  return [filterBenefits(), selectedMembership, setMembership];
};

const useRequestForm = (): boolean => {
  const query = useQuery();
  const isOpen = query.get("form");
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen === "true") {
      setIsOpenForm(true);
    }
    if (isOpen === null) {
      setIsOpenForm(false);
    }
  }, [isOpen]);

  return isOpenForm;
};

interface Props extends TransitionProp {}

const Membership: React.FC<Props> = props => {
  const history = useHistory();
  const isOpenForm = useRequestForm();
  const [benefits, membership, setMembership] = useMembership("artpass");

  const onOpenForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push("/membership?form=true");
  };

  return (
    <Wrapper>
      <Transition in={isOpenForm} timeout={props.duration} unmountOnExit={true}>
        {status => (
          <MembershipForm duration={props.duration} transitionStatus={status} />
        )}
      </Transition>
      <HeadingWrapper>
        <Logo>
          <img
            src={`${process.env.PUBLIC_URL}/img/membership.png`}
            alt="メンバーシップロゴ"
          />
        </Logo>
        <RequestButton onClick={onOpenForm}>申し込む</RequestButton>
        <Overview>
          ワタリウム美術館は、スイスの建築家マリオ・ポッタの設計により1990年9月私設美術館として開館しました。
          <wbr />
          現代アートを中心にさまざまなジャンルの展覧会を開催、一味違う関連企業も見逃せません。
          <wbr />
          ２つのメンバーシップ・アートパス会員とサポート会員は、ワタリウム美術館をさらにご活用いただくための提案です。
        </Overview>
      </HeadingWrapper>
      <Benefits>会員特典</Benefits>
      <BenefitsTab>
        <Benefit
          onClick={() => setMembership("artpass")}
          isSelected={membership === "artpass"}
        >
          ART PASS
          <BenefitRuby>アートパス</BenefitRuby>
        </Benefit>
        <Benefit
          onClick={() => setMembership("support")}
          isSelected={membership === "support"}
        >
          SUPPORT
          <BenefitRuby>サポート</BenefitRuby>
        </Benefit>
      </BenefitsTab>
      <BenefitItemsWrapper>
        {benefits.map((item, index) => (
          <CSSTransition key={uuid()} timeout={props.duration}>
            {status => (
              <BenefitItem
                transitionStatus={status}
                duration={props.duration}
                itemIndex={index - 1}
              >
                {item.label}
              </BenefitItem>
            )}
          </CSSTransition>
        ))}
      </BenefitItemsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;

  @media screen and (min-width: 1024px) {
    max-width: 990px;
    margin: 221px auto;
    padding: 0 50px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    max-width: 100%;
    margin: 221px auto;
    padding: 0 50px;
  }
  @media screen and (max-width: 633px) {
    max-width: 100%;
    margin: 87px auto;
    padding: 0 39px;
  }
`;

const HeadingWrapper = styled.section`
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 233px 1fr;
    grid-row-gap: 56px;
    margin-bottom: 256px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    margin-bottom: 256px;
  }
  @media screen and (max-width: 633px) {
    margin-bottom: 64px;
  }
`;

const Logo = styled.figure`
  @media screen and (min-width: 1024px) {
    width: 233px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    width: 233px;
  }
  @media screen and (max-width: 633px) {
    width: 116px;
  }
`;

const RequestButton = styled.button`
  border-radius: 5px;
  color: #FFF;
  outline: none;
  cursor: pointer;
  margin: auto;
  background-color: #F7BC77;
  border: none;

  @media screen and (min-width: 1024px) {
    width: 207px;
    height: 58px;
    font-size: 25px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    width: 207px;
    height: 58px;
    font-size: 25px;
  }
  @media screen and (max-width: 633px) {
    width: 100%;
    height: 32px;
    font-size: 13px;
    margin: 27px 0;
  }
`;

const Overview = styled.p`
  width: 100%;
  color: #707070;
  line-height: 32px;
  grid-row: 2;
  grid-column: 1 / 3;
  text-align: justify;
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 15px;
  }
  @media screen and (max-width: 633px) {
    font-size: 13px;
  }
`;

const Benefits = styled.h2`
  color: #707070;
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

const BenefitsTab = styled.ul`
  margin: 41px auto;
  display: grid;
  justify-content: center;
  text-align: center;
  @media screen and (min-width: 1024px) {
    grid-template-columns: 155px 155px;
    grid-column-gap: 118px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    grid-template-columns: 155px 155px;
    grid-column-gap: 118px;
  }
  @media screen and (max-width: 633px) {
    grid-template-columns: 83px 83px;
    grid-column-gap: 70px;
  }
`;

interface Benefit {
  isSelected: boolean;
}

const scaleIn = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

const Benefit = styled.li`
  margin: auto;
  color: ${(props: Benefit) => (props.isSelected ? "#202020" : "#a0a0a0")};
  font-variant-ligatures: common-ligatures;
  font-weight: normal;
  cursor: pointer;
  transition: color 200ms ease;

  &:hover {
    color: #202020;
  }

  ${(props: Benefit) =>
    props.isSelected &&
    css`
      &::after {
        content: "";
        display: block;
        width: 31px;
        height: 1px;
        background-color: #707070;
        margin: 10px auto 0 auto;
        animation: ${scaleIn} 300ms ease-in 1 forwards;
      }
    `}

  ${(props: Benefit) =>
    !props.isSelected &&
    css`
      margin-bottom: 11px;
    `}

  @media screen and (min-width: 1024px) {
    font-size: 35px;
    letter-spacing: -4px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 35px;
    letter-spacing: -4px;
  }
  @media screen and (max-width: 633px) {
    font-size: 19px;
    letter-spacing: -2px;
  }
`;

const BenefitRuby = styled.span`
  color: #707070;
  font-variant-ligatures: none;
  letter-spacing: 0;
  position: relative;
  top: -1px;
  display: block;
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    font-size: 16px;
  }
  @media screen and (max-width: 633px) {
    font-size: 7px;
  }
`;

const BenefitItemsWrapper = styled(TransitionGroup)`
  width: 100%;
  display: grid;
  @media screen and (min-width: 1024px) {
    grid-auto-rows: 150px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 68px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    grid-auto-rows: 150px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 68px;
  }
  @media screen and (max-width: 633px) {
    grid-auto-rows: 100px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 56px;
    transform: translateX(14px);
  }
`;

interface BenefitItemProp extends TransitionProp {
  itemIndex: number;
}

const BenefitItem = styled.li`
  border: solid 1px #707070;
  box-sizing: border-box;
  color: #707070;
  text-align: justify;
  display: flex;
  align-items: center;

  ${(props: BenefitItemProp) => {
    switch (props.transitionStatus) {
      case "entering":
        return css`
          opacity: 0;
          transform: translateY(20px);
        `;
      case "entered":
        return css`
          opacity: 1;
          transform: translateY(0);
          transition: all ${props.duration}ms ease;
          transition-delay: ${props.itemIndex * 50}ms;
        `;
      case "exited":
        return css`
          opacity: 1;
          transform: translateY(-100%);
        `;
      case "exiting":
        return css`
          opacity: 0;
          transform: translateY(-100%);
        `;
    }
  }}

  @media screen and (min-width: 1024px) {
    width: 150px;
    height: 150px;
    padding: 34px 6px;
    font-size: 15px;
    line-height: 26px;
  }
  @media screen and (max-width: 1023px) and (min-width: 634px) {
    width: 150px;
    height: 150px;
    padding: 34px 6px;
    font-size: 15px;
    line-height: 26px;
  }
  @media screen and (max-width: 633px) {
    width: 100px;
    height: 100px;
    padding: 22px 10px;
    font-size: 9px;
    line-height: 16px;
  }
`;

export default Membership;
