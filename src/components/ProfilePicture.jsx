import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../shared/supabaseClient';
import { login } from '../redux/slices/authSlice';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ChangeButton = styled.button`
  background-color: #00c8ff;
  border: none;
  color: #0a1528;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #1b76af;
  }
`;

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const { avatar_url, id: user_id } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(avatar_url);

  const handleChangePicture = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${user_id}_${Date.now()}.${fileExt}`;
      const filePath = `public/${uniqueFileName}`;

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: 'no-cache', // 캐시 헤더 추가
          contentType: file.type,
        });

      if (error) {
        throw error;
      }

      if (!data || !data.url) {
        throw new Error('Image URL not found');
      }

      const imageUrl = `${data.url}?timestamp=${Date.now()}`; // 새 URL 생성
      setProfileImage(imageUrl); // 프로필 이미지 URL 업데이트

      // 데이터베이스 업데이트
      const { updateError } = await supabase
        .from('users')
        .update({ avatar_url: imageUrl })
        .eq('id', user_id);

      if (updateError) {
        throw updateError;
      }

      // Redux 상태 업데이트
      dispatch(login({ id: user_id, avatar_url: imageUrl }));

      alert('프로필 사진이 변경되었습니다.');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('프로필 사진 변경에 실패했습니다.');
    }
  };

  return (
    <ProfileContainer>
      <ProfileImage src={profileImage || 'default-avatar-url'} alt="Profile" />
      <ChangeButton onClick={() => fileInputRef.current.click()}>
        변경
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChangePicture}
          ref={fileInputRef}
        />
      </ChangeButton>
    </ProfileContainer>
  );
};

export default ProfilePicture;
