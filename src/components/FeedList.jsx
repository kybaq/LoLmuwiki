import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '../shared/supabaseClient';
import { Link } from 'react-router-dom';

const StWrapper = styled.div`
  margin: 0 auto;
`;

const StSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 1200px;
  padding: 20px;
  margin: 0 auto;
  gap: 15px;
`;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  font-family: 'Helvetica', sans-serif;

  & > :first-child {
    font-size: 20px;
    font-weight: bold;
    top: 0;
    margin: 5px;
    text-align: left;
  }
  & > :nth-child(2) {
    font-size: 13px;
    margin: 5px;
  }
  & > :nth-child(3) {
    font-size: 14px;
    margin: 5px;
  }
`;

const StLink = styled(Link)`
  width: 300px;
  height: 200px;
  text-decoration: none;
  border: 0.5px solid white;
  background-color: rgba(0, 30, 83, 0.35);
  backdrop-filter: blur(30px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 15px;
  color: #9a9999;
  border-radius: 8px;
  margin: 20px auto;
  transition: transform 0.2s ease-in-out 0s;
  &:hover {
    transform: scale(1.02);
    border: none;
    color: white;
    box-shadow: 0 0 1px #8d8d8d, 0 0 3px #8d8d8d, 0 0 6px #8d8d8d,
      0 0 30px #8d8d8d;
  }
`;

const FeedList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data, error } = await supabase.from('posts').select();
      console.log(data);

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <StWrapper>
      <StSection>
        {posts.map((item) => (
          <StLink to={`/detail/${item.post_id}`} key={item.post_id}>
            <StDiv>
              <h3>{item.title}</h3>
              <span>by {item.nickname}</span>
              <p>{item.content}</p>
            </StDiv>
          </StLink>
        ))}
      </StSection>
    </StWrapper>
  );
};

export default FeedList;
