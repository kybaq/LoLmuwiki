import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SubHeader from '../components/SubHeader';

// 각 이미지 당, 크기를 2MB 로 제한.
const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;

const StSection = styled.section`
  padding: 150px 0;
`;

const StWrapper = styled.div`
  font-family: 'Helvetica', sans-serif;
  line-height: 1.5;
  justify-content: center;
  gap: 200px;
  width: 800px;
  height: 750px;
  background-color: rgba(0, 30, 83, 0.35);
  backdrop-filter: blur(30px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  padding: 15px;
  color: #9a9999;
  border-radius: 8px;
  margin: 20px auto;
  border: none;
  color: white;
  box-shadow: 0 0 1px #8d8d8d, 0 0 3px #8d8d8d, 0 0 6px #8d8d8d,
    0 0 30px #8d8d8d;
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
  margin: 10px 0 10px 0;
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

function PostPage() {
  const navigation = useNavigate();

  const { id, full_name } = useSelector((state) => state.auth);

  // 게시글 작성
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  // 게시글에 업로드하는 이미지
  const [images, setImages] = useState([]);

  const createPosts = async () => {
    if (!titleRef.current.value || !contentRef.current.innerHTML) {
      alert('제목이나 내용을 입력해 주세요.');
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: titleRef.current.value,
          user_id: id,
          nickname: full_name,
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
    navigation('/');
  };

  function handleChange(evt) {
    const FileList = evt.target.files;
    console.log(evt.target.files);

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
        imgElement.style.maxWidth = '8%';
        contentRef.current.appendChild(imgElement); // 이미지를 첨부한 경우, 자식 요소로 추가
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
    <StSection>
      <SubHeader />
      <StWrapper>
        <StForm action="">
          <h1>게시글 작성</h1>
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

          <StSubmitBtn type="submit" onClick={createPosts}>
            글 작성
          </StSubmitBtn>
        </StForm>
      </StWrapper>
    </StSection>
  );
}

export default PostPage;
