import React from 'react';
import styled from 'styled-components';

const StBtn = styled.button`
  font-size: 15px;
  bottom: 100px;
  padding: 10px 20px;
  align-items: end;
  background-color: #c8aa6e;
  border: none;
  border-radius: 5px;
  color: rgb(10, 20, 40);
  transition: color 0.3s ease 0s, background-color 0.3s ease 0s;
  outline: rgb(255, 255, 255) solid 1px;
  outline-offset: 3px;
  cursor: pointer;
  &:hover {
    background-color: #e9d3a9;
  }
`;

function PostUpdateButton({ isEditable, setIsEditable, onClickCompleteBtn }) {
  const onClickUpdateBtn = () => {
    setIsEditable(true);
  };

  return (
    <>
      {!isEditable ? (
        <StBtn onClick={onClickUpdateBtn}>수정</StBtn>
      ) : (
        <StBtn onClick={onClickCompleteBtn}>완료</StBtn>
      )}
    </>
  );
}

export default PostUpdateButton;
