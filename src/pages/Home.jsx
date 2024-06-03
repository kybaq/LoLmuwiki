import React, { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import styled from 'styled-components';
import Video from '../components/Video';
import FeedList from '../components/FeedList';

const StMain = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 70px 0px;
`;

const StWrapper = styled.div`
  margin: 0 auto;
`;

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Header handleLogin={openModal} />
      <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
      <StMain>
        <Video />
        <StWrapper>
          <FeedList />
        </StWrapper>
      </StMain>
    </div>
  );
};

export default Home;
