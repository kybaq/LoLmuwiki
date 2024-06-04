import { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import styled from 'styled-components';
import Video from '../components/Video';
import FeedList from '../components/FeedList';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

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
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getUserSession = async () => {
    const { data } = await supabase.auth.getSession();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { session } = await getUserSession();
      if (session) {
        dispatch(login(session.user.identities[0]));
      }
    };
    fetchData();
  }, []);

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
