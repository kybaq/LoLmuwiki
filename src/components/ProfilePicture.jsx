import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../shared/supabaseClient';
import { login } from '../redux/slices/authSlice';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
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
  const { user_id, email, avatar_url } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(avatar_url);
  const fileInputRef = useRef(null);

  const handleChangePicture = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${user_id}_${Date.now()}.${fileExt}`;
      const filePath = `public/${uniqueFileName}`;

      await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          contentType: file.type 
        });

      const publicURL = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const localImageUrl = URL.createObjectURL(file);
      setProfileImage(localImageUrl);
      
      // 데이터베이스 업데이트
      await supabase
        .from('users')
        .update({ avatar_url: publicURL })
        .eq('user_id', user_id);

      // Redux 상태 업데이트
      dispatch(login({ user_id, email, avatar_url: publicURL }));
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('프로필 사진이 변경 되었습니다.');
    }
  };

  useEffect(() => {
    setProfileImage(avatar_url);
  }, [avatar_url]);

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
