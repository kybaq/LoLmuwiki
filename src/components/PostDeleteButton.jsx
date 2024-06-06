import React from 'react';
import { supabase } from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';

function PostDeleteButton({ user_id, post_id, setPosts, setModalOpened }) {
  //
  const navigate = useNavigate();

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
        prevPosts.filter((post) => post.post_id !== post_id),
      );
      setModalOpened(false);
      alert('성공적으로 삭제되었습니다.');
      navigate('/');
      return;
    }
  };

  return <button onClick={() => deletePost()}>삭제</button>;
}

export default PostDeleteButton;
