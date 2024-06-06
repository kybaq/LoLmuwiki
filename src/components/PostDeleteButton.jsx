import React from 'react';
import { supabase } from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StBtn = styled.button`
  font-size: 15px;
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

function PostDeleteButton({ user_id, post_id, setPosts, setModalOpened }) {
  //
  const navigation = useNavigate();

  const deletePost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('user_id', `${user_id}`)
      .eq('post_id', `${post_id}`);

    if (error) {
      console.error('Error deleting post: ', error);
      return;
    } else {
      setPosts((prevPosts) =>
        prevPosts.filter(
          (post) => post.post_id !== post_id && post.user_id !== user_id,
        ),
      );
      setModalOpened(false);
      alert('성공적으로 삭제되었습니다.');
      navigation('/');
      return;
    }
  };

  return <StBtn onClick={() => deletePost()}>삭제</StBtn>;
}

export default PostDeleteButton;
