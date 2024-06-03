import React from 'react';
import styled from 'styled-components';
import AccountInfoItem from './AccountInfoItem';

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountInfo = () => {
  const handlePasswordReset = () => {
    alert('비밀번호를 재설정할 수 있습니다.');
  };

  const handleNicknameChange = () => {
    alert('닉네임을 수정할 수 있습니다.');
  };

  return (
    <AccountInfoContainer>
      <AccountInfoItem label="이메일">
        <input type="text" value="example@gmail.com" readOnly />
      </AccountInfoItem>
      <AccountInfoItem label="비밀번호">
        <a href="#" onClick={handlePasswordReset}>비밀번호 재설정하기</a>
      </AccountInfoItem>
      <AccountInfoItem label="닉네임">
        <span>b10조-석</span>
        <a href="#" onClick={handleNicknameChange}>닉네임 수정하기</a>
      </AccountInfoItem>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
