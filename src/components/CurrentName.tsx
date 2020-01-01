import React from 'react';
import styled from 'styled-components';
import { useCurrentName } from "../commons/hooks";

const CurrentName = () => {
  const currentName = useCurrentName();

  return (
    <PageName>
      {currentName}
    </PageName>
  );
};

const PageName = styled.h3`
  display: inline-block;
  font-size: 15px;
  color: #707070;
  height: 16px;
`;

export default CurrentName;
