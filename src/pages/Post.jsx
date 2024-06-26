import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { v4 } from 'uuid';

// 각 이미지 당, 크기를 2MB 로 제한.
const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;
// 게시글 당 최대 이미지 2개
const MAX_IMAGE_COUNT = 2;

const StWrapper = styled.div`
  font-family: 'Helvetica', sans-serif;
  line-height: 1.5;
  justify-content: center;
  width: 800px;
  height: 750px;
  background-color: rgba(0, 30, 83, 0.35);
  backdrop-filter: blur(30px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  padding: 15px;
  color: #9a9999;
  border-radius: 8px;
  margin: 150px auto 0;
  border: none;
  color: white;
  box-shadow: 0 0 1px #8d8d8d, 0 0 3px #8d8d8d, 0 0 6px #8d8d8d,
    0 0 30px #8d8d8d;
`;

const StTitle = styled.h1`
  font-size: 24px;
  margin: 20px;
  text-align: center;
`;

const StForm = styled.form`
  width: 90%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  text-decoration: none;
  text-align: left;
  align-items: center;
`;

const StTitleInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const StContentInput = styled.div`
  width: 100%;
  min-height: 400px;
  max-height: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  color: black;
  outline: none;
  overflow-y: scroll;
`;

const StFileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StFileUpBtn = styled.label`
  padding: 10px 20px;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-top: 10px;
  &:hover {
    transform: scale(1.09);
  }
`;

const StFileInput = styled.input`
  display: none;
`;

const StSubmitBtn = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  background-color: #007bff;
  color: white;
  font-size: 16px;

  &:hover {
    transform: scale(1.09);
  }
`;

function Post() {
  const [user_id, setUser_id] = useState(null);
  const [nickname, setNickname] = useState(null);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    setUser_id(user.id);
    setNickname(user.user_metadata.full_name);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 게시글 작성
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  // 게시글에 업로드하는 이미지
  const [images, setImages] = useState([]);

  const createPosts = async (e) => {
    e.preventDefault();
    if (!titleRef.current.value || !contentRef.current.innerHTML) {
      alert('제목이나 내용을 입력해 주세요.');
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: titleRef.current.value,
          user_id,
          nickname,
          img_path: images,
          content: contentRef.current.innerText,
        },
      ])
      .select('*');

    if (error) {
      console.error('Error creating post:', error);
    } else {
      console.log('Post created:', data);
    }

    alert('작성이 완료되었습니다.');
    navigate('/');
  };

  const onUploadImages = async (img) => {
    const { data, error } = await supabase.storage
      .from('posts_img')
      .upload(`public/${v4()}`, img, {
        // 업로드하는 이미지를 모두 unique 하게 만듦
        contentType: 'image/',
      });
    if (error) {
      console.error('Error: ', error);
      return;
    } else {
      // 이미지 업로드가 성공적으로 이루어지면 public url 을 얻어와 저장.
      const publicUrl = supabase.storage
        .from('posts_img')
        .getPublicUrl(data.path);
      setImages((prev) => [...prev, publicUrl]);
    }
  };

  function handleChange(evt) {
    const FileList = evt.target.files;

    if (images.length + FileList.length > MAX_IMAGE_COUNT) {
      alert(`이미지는 최대 ${MAX_IMAGE_COUNT}개까지만 업로드할 수 있습니다.`);
      return;
    }

    const imgs = []; // File 객체 중, 진짜 파일 정보만 가져오기 위해

    for (const key in FileList) {
      if (typeof FileList[key] === 'object') imgs.push(FileList[key]); // 실제 파일 객체라면 추가
    }

    imgs.forEach((img) => {
      if (img && img.size <= MAX_IMAGE_SIZE_BYTES) {
        // 2MB 이하의 이미지만 업로드 받음.
        const imgURL = URL.createObjectURL(img);
        const imgElement = document.createElement('img');
        imgElement.src = imgURL;
        imgElement.style.maxWidth = '10%';
        contentRef.current.appendChild(imgElement); // 이미지를 첨부한 경우, 자식 요소로 추가
        onUploadImages(img);
      } else if (img && img.size > MAX_IMAGE_SIZE_BYTES) {
        // 파일을 업로드했지만 2MB 이상일 경우
        alert(
          '업로드한 이미지의 크기가 너무 큽니다. 하나의 이미지 당 크기는 2MB 까지만 허용합니다.',
        );
      }
      // 파일을 업로드하지 않은 경우에는 아무 동작하지 않음.
    });
  }

  return (
    <section>
      <Header />
      <StWrapper>
        <StTitle>게시글 작성</StTitle>
        <StForm action="" onSubmit={createPosts}>
          <StTitleInput type="text" placeholder="제목" ref={titleRef} />
          <StContentInput contentEditable="true" ref={contentRef} />
          <StFileInputWrapper ref={imgRef}>
            <StFileUpBtn htmlFor="file">파일 업로드하기</StFileUpBtn>
            <StFileInput
              multiple
              type="file"
              name="file"
              id="file"
              onChange={handleChange}
              accept="image/*"
            />
          </StFileInputWrapper>
          <StSubmitBtn>글 작성</StSubmitBtn>
        </StForm>
      </StWrapper>
    </section>
  );
}

export default Post;
