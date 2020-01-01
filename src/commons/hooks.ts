import { useEffect, useState } from "react";
import { Labels } from "./types";
import { useLocation } from "react-router-dom";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const useCurrentName = (): Labels | '' => {
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
  }, [location]);

  return currentName;
};
