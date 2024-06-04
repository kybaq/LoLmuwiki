import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  bottom: 50px;
  right: 40px;
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  width: 50px;
  height: 50px;
  background-color: #a68c59;
  color: white;
  border: 2px solid #51442a;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
  cursor: pointer;
  font-size: 24px;
  z-index: 1000;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 450) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button onClick={scrollToTop} $visible={isVisible}>
      ↑
    </Button>
  );
};

export default ToTopButton;
