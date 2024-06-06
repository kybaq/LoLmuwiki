import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
  overflow: hidden;
`;

const StVideo = styled.video`
  height: 600px;
  width: 100%;
  object-fit: cover;
`;

const StBtn = styled.button`
  position: absolute;
  width: 200px;
  height: 70px;
  font-size: 18px;
  bottom: 100px;
  padding: 10px 20px;
  align-items: end;
  background-color: #c8aa6e;
  border: none;
  border-radius: 5px;
  color: rgb(10, 20, 40);
  transition: color 0.3s ease 0s, background-color 0.3s ease 0s;
  outline: rgb(255, 255, 255) solid 1px;
  outline-offset: 3px;
  cursor: pointer;

  &:hover {
    background-color: #e9d3a9;
  }
`;

const Video = () => {
  const navigation = useNavigate();
  const onHandleWriteBtn = () => {
    if (localStorage.getItem('isLoggedIn')) navigation('post');
    else {
      alert('로그인을 해주세요.');
      return;
    }
  };
  return (
    <Wrapper>
      <StVideo autoPlay loop muted>
        <source
          src="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news/8ab3e227121c53aacab0c9b9f7a48adbc65db520.webm"
          type="video/webm"
        />
      </StVideo>
      <StBtn onClick={onHandleWriteBtn}>글 쓰기</StBtn>
    </Wrapper>
  );
};

export default Video;
