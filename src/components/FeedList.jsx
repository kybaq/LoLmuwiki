import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../shared/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import PostViewModal from './PostViewModal';

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

  const navigation = useNavigate();
  // 게시글 클릭 시 모달 창 출력
  const [isModalOpened, setModalOpened] = useState(false);

  const onHandleClickPost = (post) => {
    navigation(`detail/${post.id}`); // 상세페이지로 라우팅
    setModalOpened(true); // 모달 창 열기
    setActivePost(post); // 클릭한 게시글
    console.log('modal');
  };

  // 실제 클릭한 Post 선택
  const [activePost, setActivePost] = useState(null);

  // 모달 영역 지정을 위한 변수
  const modalRef = useRef(null);

  // 실제 글 목록과, 모달 부분을 제외한 영역을 클릭한 경우 모달 닫힘
  useEffect(() => {
    const clickOutside = (evt) => {
      if (
        isModalOpened && // 모달이 열려있으면서
        modalRef.current && // 게시글 목록이 존재하고
        !modalRef.current.contains(evt.target) // mousedown 이벤트 발생 대상이 게시글 목록 부분이 아니라면,
      ) {
        setModalOpened(false); // 모달 닫음
        navigation('/'); // 홈으로 이동
      }
    };

    document.addEventListener('mousedown', clickOutside); // 이벤트 리스너 추가

    return () => {
      document.removeEventListener('mousedown', clickOutside); // 동작하고 나면 즉시 삭제
    };
  }, [isModalOpened]);

  return (
    <StWrapper>
      <StSection>
        {posts.map((item) => (
          <StLink
            to={`/detail/${item.post_id}`}
            key={item.post_id}
            onClick={() => onHandleClickPost(item)}
          >
            <StDiv>
              <h3>{item.title}</h3>
              <span>by {item.nickname}</span>
              <p>{item.content}</p>
            </StDiv>
          </StLink>
        ))}
      </StSection>
      <div ref={modalRef}>
        {isModalOpened ? <PostViewModal post={activePost} /> : null}
      </div>
    </StWrapper>
  );
};

export default FeedList;
