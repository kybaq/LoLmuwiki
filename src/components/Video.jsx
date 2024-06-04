import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StVideo = styled.video`
  height: 600px;
  width: 100%;
  object-fit: cover;
`;

const StBtn = styled.button`
  position: absolute;
  width: 150px;
  font-size: 15px;
  font-weight: bold;
  height: 50px;
  bottom: 150px;
  padding: 10px 20px;
  align-items: end;
  background-color: rgb(200, 170, 110);
  border: none;
  border-radius: 5px;
  color: rgb(10, 20, 40);
  transition: color 0.3s ease 0s, background-color 0.3s ease 0s;
  outline: rgb(255, 255, 255) solid 1px;
  outline-offset: 3px;
  cursor: pointer;

  &:hover {
    background-color: rgb(233, 211, 169);
  }
`;

const Video = () => {
  const navigation = useNavigate();

  const onHandleWriteBtn = () => {
    // 로그인 상태일 때만 가능하도록 설정필요.
  };

  return (
    <Wrapper>
      <StVideo autoPlay loop muted>
        <source
          src="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news/8ab3e227121c53aacab0c9b9f7a48adbc65db520.webm"
          type="video/webm"
        />
      </StVideo>
      <StBtn onClick={() => navigation('post')}>글 쓰기</StBtn>
    </Wrapper>
  );
};

export default Video;
