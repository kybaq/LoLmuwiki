import styled from 'styled-components';
import PostDeleteButton from './PostDeleteButton';
import { useSelector } from 'react-redux';
import PostUpdateButton from './PostUpdateButton';
import { useRef, useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';

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

const StTitle = styled.textarea`
  max-height: 40px;
  width: 700px;
  margin-bottom: 40px;
  text-align: center;
  font-size: x-large;
  border-radius: 8px;
  text-align: left;
  overflow-x: scroll; /* Enable horizontal scrolling */
  overflow-y: hidden;
  resize: none;
`;

const StDiv = styled.div`
  width: 700px;
  height: 500px;
  padding: 15px;
  font-size: 1em;
  color: black;
  background-color: white;
  border-radius: 8px;
  border: none;
  resize: none;
  text-align: center;
  margin-bottom: 30px;
  overflow-y: scroll;
  scrollbar-color: #b3b3b3 transparent;

  img {
    max-width: 250px;
    text-align: center;
    margin-bottom: 10px;
  }

  textarea {
    border: none;
    resize: none;
    width: 690px;
    height: 220px;
  }
`;

const StBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  gap: 20px;
`;

const PostViewModal = ({ activePost, setPosts, setModalOpened }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const { user_id, post_id } = activePost;
  const { id } = user;
  const [isEditable, setIsEditable] = useState(false);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const img_path = activePost.img_path;

  const updatePost = async () => {
    const { error } = await supabase
      .from('posts')
      .update({
        title: titleRef.current.value,
        content: contentRef.current.value,
      })
      .eq('post_id', post_id);

    if (error) {
      console.error('Error updating post:', error);
      return;
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.post_id === post_id
          ? {
              ...post,
              title: titleRef.current.value,
              content: contentRef.current.value,
            }
          : post,
      ),
    );
  };

  const onClickCompleteBtn = async () => {
    await updatePost();
    setIsEditable(false);
    setModalOpened(false);
    alert('수정완료되었습니다.');
    navigate('/');
  };

  return (
    <StModal $active={!!activePost}>
      <StTitle
        readOnly={!isEditable}
        defaultValue={activePost.title}
        ref={titleRef}
      />
      <StDiv>
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
        <textarea
          readOnly={!isEditable}
          defaultValue={activePost.content}
          ref={contentRef}
        />
      </StDiv>
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
