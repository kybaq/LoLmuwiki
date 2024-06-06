import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { supabase } from '../shared/supabaseClient';
import Sidebar from '../components/Sidebar';
import SubHeader from '../components/SubHeader';
import PostViewModal from '../components/PostViewModal';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: Arial, sans-serif;
  align-items: center;
  font-family: 'Helvetica', sans-serif;
  line-height: 1.5;
  width: 800px;
  height: 600px;
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
  margin-top: 170px;
`;

const InnerContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  align-items: center;
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  text-align: center;
  font-size: x-large;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 30, 83, 0.1);
  }
`;

const Myposts = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth);
  const [isModalOpened, setModalOpened] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user.id) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id); // user_id 대신 id를 기반으로 불러오기

        if (error) {
          console.error('Error fetching posts:', error.message);
        } else {
          setPosts(data);
        }
      }
    };

    fetchPosts();
  }, [user.id]);

  const onHandleClickPost = (post) => {
    setActivePost(post);
    setModalOpened(true);
  };

  useEffect(() => {
    const clickOutside = (evt) => {
      if (
        isModalOpened && // 모달이 열려있으면서
        modalRef.current && // 게시글 목록이 존재하고
        !modalRef.current.contains(evt.target) // mousedown 이벤트 발생 대상이 게시글 목록 부분이 아니라면,
      ) {
        setModalOpened(false); // 모달 닫음
      }
    };

    document.addEventListener('mousedown', clickOutside); // 이벤트 리스너 추가

    return () => {
      document.removeEventListener('mousedown', clickOutside); // 동작하고 나면 즉시 삭제
    };
  }, [isModalOpened]);

  return (
    <>
      <SubHeader />
      <PageContainer>
        <InnerContainer>
          <Sidebar />
          <Content>
            <Title>내 게시물</Title>
            <PostList>
              {posts.map((post) => (
                <PostItem key={post.id} onClick={() => onHandleClickPost(post)}>
                  {post.title}
                </PostItem>
              ))}
            </PostList>
          </Content>
        </InnerContainer>
      </PageContainer>
      {isModalOpened && activePost && (
        <div ref={modalRef}>
          <PostViewModal
            activePost={activePost}
            setPosts={setPosts}
            setModalOpened={setModalOpened}
          />
        </div>
      )}
    </>
  );
};

export default Myposts;
