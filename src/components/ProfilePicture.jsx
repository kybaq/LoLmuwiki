import React, { useState, useRef } from 'react';
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
  const {
    id: userId,
    email,
    full_name,
    avatar_url,
  } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    avatar_url || 'default-avatar-url',
  );

  const handleChangePicture = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `profile_${Date.now()}.${fileExt}`;
      const filePath = `public/${uniqueFileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: 'no-cache',
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      dispatch(
        login({
          user_id: userId,
          email: email, 
          identity_data: {
            full_name: full_name, 
            avatar_url: publicUrl,
          },
        }),
      );

      await updateUserImage(userId, publicUrl);

      setProfileImage(publicUrl);
      alert('프로필 사진이 변경되었습니다.');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('프로필 사진 변경에 실패했습니다.');
    }
  };

  async function updateUserImage(userId, imageUrl) {
    const { data, error } = await supabase
      .from('users') 
      .update({ avatar_url: imageUrl }) 
      .eq('id', userId); 

    if (error) {
      console.error('Error updating user avatar URL:', error);
      return;
    }
    console.log('User avatar URL updated:', data);
  }

  return (
    <ProfileContainer>
      <ProfileImage src={profileImage} alt="Profile" />
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
