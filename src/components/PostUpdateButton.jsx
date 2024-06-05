import React from 'react';

function PostUpdateButton({ isEditable, setIsEditable, onClickCompleteBtn }) {
  const onClickUpdateBtn = () => {
    setIsEditable(true);
  };

  return (
    <>
      {!isEditable ? (
        <button onClick={onClickUpdateBtn}>수정</button>
      ) : (
        <button onClick={onClickCompleteBtn}>완료</button>
      )}
    </>
  );
}

export default PostUpdateButton;
