import React from 'react';
import styled from 'styled-components';

const Stmodal = styled.section`
  /* display: ${(props) => (props.$active ? 'flex' : 'none')}; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 600px;
  background-color: blue;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // x, y 모두 -50% 만큼
`;

const PostViewModal = ({ post }) => {
  return (
    <Stmodal>
      <div>Title</div>
      <div>{post.content}</div>
    </Stmodal>
  );
};

export default PostViewModal;
