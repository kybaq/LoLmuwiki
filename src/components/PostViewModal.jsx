import styled from 'styled-components';
import PostDeleteButton from './PostDeleteButton';
import { useSelector } from 'react-redux';
import PostUpdateButton from './PostUpdateButton';
import { useRef, useState } from 'react';
import { supabase } from '../shared/supabaseClient';

const Stmodal = styled.section`
  /* display: ${(props) => (props.$active ? 'flex' : 'none')}; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 850px;
  background-color: blue;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // x, y 모두 -50% 만큼
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

  // 완료 버튼의 이벤트 핸들러임. 현재 구조가 복잡해져서 전역 상태로 관리할 필요가 있을 듯.
  const onClickCompleteBtn = async () => {
    await updatePost();
    setIsEditable(false);
    setModalOpened(false);
    alert('수정완료되었습니다.');
  };

  return (
    <Stmodal>
      <h1>{activePost.title}</h1>
      <div>
        <textarea
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
        <>
          <PostUpdateButton
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            onClickCompleteBtn={onClickCompleteBtn}
          />
          <PostDeleteButton
            user_id={user_id}
            post_id={post_id}
            setPosts={setPosts}
            setModalOpened={setModalOpened}
          />
        </>
      ) : null}
    </Stmodal>
  );
};

export default PostViewModal;
