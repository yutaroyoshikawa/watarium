import React from 'react';
import styled from 'styled-components';
import { TransitionProp } from '../App';

interface Prop extends TransitionProp {};

const Home: React.FC<Prop> = prop => {
  return (
    <Wrap>
      hoge
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;

export default Home;
