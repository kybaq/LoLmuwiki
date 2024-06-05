import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AccountInfoItem from './AccountInfoItem';
import ProfilePicture from './ProfilePicture';

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  color: white;
`;

const AccountInfo = () => {
  const { email, full_name } = useSelector((state) => state.auth);

  return (
    <AccountInfoContainer>
      <ProfilePicture />
      <AccountInfoItem label="이메일" value={email} editable={false} />
      <AccountInfoItem label="닉네임" value={full_name} editable={false} />
    </AccountInfoContainer>
  );
};

export default AccountInfo;
