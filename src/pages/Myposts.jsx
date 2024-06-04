import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { supabase } from '../shared/supabaseClient';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
`;

const Title = styled.h1`
  margin-bottom: 20px;
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
          .eq('user_id', user.id);
          //supabase table 값 user_id 로 표기

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
    <Container>
      <Sidebar />
      <Content>
        <Title>내 게시물</Title>
        <PostList>
          {posts.map((post) => (
            <PostItem key={post.id}>{post.title}</PostItem>
          ))}
        </PostList>
      </Content>
    </Container>
  );
};

export default Myposts;
