import React from "react";
import styled from "styled-components";
import { useCurrentName } from "../commons/hooks";

const CurrentName = () => {
  const currentName = useCurrentName();

  return <PageName>{currentName}</PageName>;
};

const PageName = styled.h3`
  @media screen and (min-width: 1024px) {
    display: inline-block;
    font-size: 15px;
    color: #707070;
    height: 16px;
    margin-top: 47px;
  }

  @media screen and (max-width: 1023px) and (min-width: 634px) {
    display: none;
  }

  @media screen and (max-width: 633px) {
    display: none;
  }
`;

export default CurrentName;
