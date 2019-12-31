import React from 'react';
import styled from 'styled-components';

const NotFound: React.FC = () => {
  return (
    <Wrap>
      <code>404</code>
      <h1>Not Found</h1>
    </Wrap>
  )
};

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NotFound;
