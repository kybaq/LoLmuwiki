import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AccountInfoItem from './AccountInfoItem';
import supabase from '../supabaseClient';

const AccountInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountInfo = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const user = supabase.auth.user();
      if (user) {
        setEmail(user.email);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('nickname')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setNickname(data.nickname);
        }
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordReset = async () => {
    const newPassword = prompt('새로운 비밀번호를 입력하세요:');
    if (newPassword) {
      // 비밀번호를 Supabase에 저장하는 로직
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        alert('비밀번호 변경 중 오류가 발생했습니다: ' + error.message);
      } else {
        alert('비밀번호가 성공적으로 변경되었습니다.');
      }
    }
  };

  const handleNicknameChange = async () => {
    const newNickname = prompt('새로운 닉네임을 입력하세요:');
    if (newNickname) {
      // 닉네임을 Supabase에 저장하는 로직
      const user = supabase.auth.user();
      const { error } = await supabase
        .from('profiles')
        .update({ nickname: newNickname })
        .eq('id', user.id);

      if (error) {
        alert('닉네임 변경 중 오류가 발생했습니다: ' + error.message);
      } else {
        setNickname(newNickname); // 닉네임 상태 업데이트
        alert('닉네임이 성공적으로 변경되었습니다.');
      }
    }
  };

  return (
    <AccountInfoContainer>
      <AccountInfoItem label="이메일">
        <input type="text" value={email} readOnly />
      </AccountInfoItem>
      <AccountInfoItem label="비밀번호">
        <a href="#" onClick={handlePasswordReset}>비밀번호 재설정하기</a>
      </AccountInfoItem>
      <AccountInfoItem label="닉네임">
        <span>{nickname}</span>
        <a href="#" onClick={handleNicknameChange}>닉네임 수정하기</a>
      </AccountInfoItem>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
