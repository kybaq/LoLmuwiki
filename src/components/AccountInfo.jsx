import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AccountInfoItem from './AccountInfoItem';
import ProfilePicture from './ProfilePicture';
import { supabase } from '../shared/supabaseClient';

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 20px;
  color: white;
`;

const AccountInfo = () => {
  const [email, setEmail] = useState(null);
  const [full_name, setFull_name] = useState(null);

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    setEmail(user.email);
    setFull_name(user.user_metadata.full_name);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AccountInfoContainer>
      <ProfilePicture />
      <AccountInfoItem label="이메일" value={email} editable={false} />
      <AccountInfoItem label="닉네임" value={full_name} editable={false} />
    </AccountInfoContainer>
  );
};

export default AccountInfo;
