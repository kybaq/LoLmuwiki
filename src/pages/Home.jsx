import React, { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import styled from 'styled-components';
import Video from '../components/Video';
import FeedList from '../components/FeedList';
import ToTopButton from '../components/ToTopBtn';

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
    <>
      <StMain>
        <Header handleLogin={openModal} />
        <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
        <Video />
        <FeedList />
      </StMain>
      <ToTopButton />
    </>
  );
};

export default Home;
