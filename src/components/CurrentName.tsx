import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Labels } from '../App';

const useCurrentName = (): Labels | '' => {
  const location = useLocation();
  const [currentName, setCurrentName] = useState<Labels | ''>('');

  useEffect(() => {
    switch (location.pathname) {
      case '/about':
        setCurrentName('ワタリウム美術館について');
        break;
      case '/exhibitions':
        setCurrentName('展覧会');
        break;
      case '/membership':
        setCurrentName('メンバーシップ');
        break;
      case '/schedule':
        setCurrentName('スケジュール');
        break;
      default:
        setCurrentName('');
    }
  }, [location.pathname]);

  return currentName;
};

const CurrentName = () => {
  const currentName = useCurrentName();

  return (
    <PageName>
      {currentName}
    </PageName>
  );
};

const PageName = styled.h3`
  font-size: 15px;
  color: #707070;
`;

export default CurrentName;
