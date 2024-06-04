import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import AccountInfoItem from './AccountInfoItem';
import ProfilePicture from './ProfilePicture';
import { supabase } from '../shared/supabaseClient';
import { login } from '../redux/slices/authSlice';

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100%;
  padding: 20px;
`;

const AccountInfo = () => {
  const dispatch = useDispatch();
  const { id, email, full_name } = useSelector((state) => state.auth);

  const handleNicknameChange = async () => {
    const newNickname = prompt('새로운 닉네임을 입력하세요:', full_name);
    
    if (newNickname === null) return; 
    
    if (newNickname !== full_name) {
      if (newNickname.length > 8) {
        alert('닉네임은 8자 이하로 설정해야 합니다.');
        return;
      }
      try {
        const { error } = await supabase
          .from('users')
          .update({ nickname: newNickname })
          .eq('id', id);
  
        if (error) {
          throw error;
        }
  
        dispatch(login({ id, email, full_name: newNickname }));
  
        alert('닉네임이 성공적으로 변경되었습니다.');
      } catch (error) {
        console.error('닉네임 변경 중 오류:', error);
        alert('닉네임 변경 중 오류가 발생했습니다.');
      }
    }
  };
  
  return (
    <AccountInfoContainer>
      <ProfilePicture />
      <AccountInfoItem label="이메일" value={email} editable={false} />
      <AccountInfoItem label="닉네임" value={full_name} editable={true} onEdit={handleNicknameChange} />
    </AccountInfoContainer>
  );
};

export default AccountInfo;
