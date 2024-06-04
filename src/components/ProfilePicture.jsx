import React, { useState } from 'react';
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
  const { id, avatar_url, email, full_name } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(avatar_url);

  const handleChangePicture = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${id}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (error) {
        throw error;
      }

      const { publicURL, error: urlError } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (urlError) {
        throw urlError;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicURL })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      dispatch(login({ id, email, full_name, avatar_url: publicURL }));
      setProfileImage(publicURL);

      alert('프로필 사진이 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('프로필 사진 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <ProfileContainer>
      <ProfileImage src={profileImage || 'default-avatar-url'} alt="Profile" />
      <ChangeButton>
        <label>
          변경
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleChangePicture}
          />
        </label>
      </ChangeButton>
    </ProfileContainer>
  );
};

export default ProfilePicture;
