import { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import styled from 'styled-components';
import Video from '../components/Video';
import FeedList from '../components/FeedList';
import { useEffect } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import ToTopButton from '../components/ToTopBtn';

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  // const authData = useSelector((state) => state.auth);
  // console.log('authData::', authData);

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
