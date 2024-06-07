import React, { useState, useRef, useEffect } from 'react';
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
  const fileInputRef = useRef(null);
  const [user_id, setUser_id] = useState(null);
  const [email, setEmail] = useState(null);
  const [full_name, setFull_name] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    setUser_id(user.id);
    setEmail(user.email);
    setFull_name(user.user_metadata.full_name);
    setProfileImage(user.user_metadata.avatar_url);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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

      // 서버로 부터 얻어온 정보
      dispatch(
        login({
          user_id,
          email, // 현재 사용자의 이메일
          identity_data: {
            full_name, // 현재 사용자의 전체 이름
            avatar_url: publicUrl,
          },
        }),
      );

      // 프로필 이미지 URL 업데이트
      await updateUserImage(user_id, publicUrl);

      setProfileImage(publicUrl);
      alert('프로필 사진이 변경되었습니다.');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('프로필 사진 변경에 실패했습니다.');
    }
  };

  async function updateUserImage(user_id, imageUrl) {
    const { data, error } = await supabase
      .from('users') // 업데이트할 테이블 지정
      .update({ avatar_url: imageUrl }) // 업데이트할 데이터 지정
      .eq('user_id', user_id); // 조건 지정

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
