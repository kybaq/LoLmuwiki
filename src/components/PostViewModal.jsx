import styled from 'styled-components';
import PostDeleteButton from './PostDeleteButton';
import { useSelector } from 'react-redux';
import PostUpdateButton from './PostUpdateButton';
import { useRef, useState } from 'react';
import { supabase } from '../shared/supabaseClient';

const StModal = styled.section`
  font-family: 'Helvetica', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 800px;
  background-color: rgba(0, 24, 64, 0.85);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  padding: 20px;
  color: white;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  overflow-y: none;
  z-index: 1000;
`;

const StTitle = styled.h1`
  margin-bottom: 40px;
  text-align: center;
  font-size: x-large;
`;

const StTextArea = styled.textarea`
  width: 700px;
  height: 500px;
  padding: 15px;
  font-size: 1em;
  color: black;
  background-color: white;
  border-radius: 8px;
  border: none;
  resize: none;
  margin-bottom: 40px;
  overflow-y: scroll;
  scrollbar-color: #b3b3b3 transparent;
`;

const StBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  gap: 20px;
`;

const PostViewModal = ({ activePost, setPosts, setModalOpened }) => {
  const user = useSelector((state) => state.auth);
  const { user_id, post_id } = activePost;
  const { id } = user;
  const [isEditable, setIsEditable] = useState(false);
  const contentRef = useRef(null);
  const img_path = activePost.img_path;

  const updatePost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ content: contentRef.current.value })
      .eq('post_id', post_id);

    if (error) {
      console.error('Error updating post:', error);
      return;
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.post_id === post_id
          ? { ...post, content: contentRef.current.value }
          : post,
      ),
    );
  };

  const onClickCompleteBtn = async () => {
    await updatePost();
    setIsEditable(false);
    setModalOpened(false);
    alert('수정완료되었습니다.');
  };

  return (
    <StModal $active={!!activePost}>
      <StTitle>{activePost.title}</StTitle>
      <div>
        <StTextArea
          readOnly={!isEditable}
          defaultValue={activePost.content}
          ref={contentRef}
        />
        <div>
          {img_path.map((elem) => (
            <img
              key={elem.data.publicUrl}
              style={{
                width: '400px',
              }}
              src={elem.data.publicUrl}
              alt=""
            />
          ))}
        </div>
      </div>
      {user_id === id ? (
        <StBtnContainer>
          <PostDeleteButton
            user_id={user_id}
            post_id={post_id}
            setPosts={setPosts}
            setModalOpened={setModalOpened}
          />
          <PostUpdateButton
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            onClickCompleteBtn={onClickCompleteBtn}
          />
        </StBtnContainer>
      ) : null}
    </StModal>
  );
};

export default PostViewModal;
