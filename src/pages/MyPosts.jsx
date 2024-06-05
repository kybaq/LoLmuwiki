import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { supabase } from '../shared/supabaseClient';
import Sidebar from '../components/Sidebar';
import SubHeader from '../components/SubHeader';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica', sans-serif;
  line-height: 1.5;
  gap: 100px;
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
  margin-top: 150px;
`;

const InnerContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: x-large;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Myposts = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth);

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
                <PostItem key={post.id}>{post.title}</PostItem>
              ))}
            </PostList>
          </Content>
        </InnerContainer>
      </PageContainer>
    </>
  );
};

export default Myposts;
