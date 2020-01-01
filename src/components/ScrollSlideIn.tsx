import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const ScrollSlideIn: React.FC = props => {
  const selfRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const judgeIsVisible = () => {
      if (selfRef.current) {
        const currentY = window.scrollY - window.innerHeight / 1.7;
        const clientY = selfRef.current.clientTop;

        currentY > clientY ? setIsVisible(true) : setIsVisible(false);
      }
    };

    window.addEventListener("scroll", judgeIsVisible);

    return () => {
      window.removeEventListener("scroll", judgeIsVisible);
    };
  }, []);

  return (
    <Wrap ref={selfRef} isVisible={isVisible}>
      {props.children}
    </Wrap>
  );
};

export default ScrollSlideIn;

interface WrapProp {
  isVisible: boolean;
}

const Wrap = styled.div`
  transition: all 500ms ease;

  ${(props: WrapProp) =>
    props.isVisible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(100px);
        `}
`;
