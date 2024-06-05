import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 각 이미지 당, 크기를 2MB 로 제한.
const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;

const StBtn = styled.div`
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
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
    <section>
      <h1>게시글 작성</h1>

      <form action="">
        <input type="text" placeholder="제목" ref={titleRef} />
        <div
          contentEditable="true"
          style={{
            border: '1px solid black',
          }}
          ref={contentRef}
        ></div>
        <div ref={imgRef}>
          <label htmlFor="file">
            <StBtn>파일 업로드하기</StBtn>
          </label>
          <input
            multiple
            style={{ display: 'none' }}
            type="file"
            name="file"
            id="file"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
      </form>

      <button type="submit" onClick={createPosts}>
        글 작성
      </button>
    </section>
  );
}

export default PostPage;
