import { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import styled from 'styled-components';
import Video from '../components/Video';
import FeedList from '../components/FeedList';
import { useEffect } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
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
  const user = useSelector((state) => state.auth);

  const saveUserToDatabase = async (user) => {
    console.log('user::', user);
    const userData = {
      user_id: user.id,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      email: user.email,
      created_at: user.created_at,
    };
    console.log('user_id::', userData.user_id);
    // try {
    //   const { error } = await supabase.from('users').upsert([userData]);
    //   if (error) {
    //     console.error(
    //       '유저 정보를 데이터베이스에 저장하는 중 에러 발생:',
    //       error.message,
    //     );
    //   } else {
    //     console.log('유저 정보를 데이터베이스에 성공적으로 저장');
    //   }
    // } catch (error) {
    //   console.error(
    //     '유저 정보를 데이터베이스에 저장하는 중 에러 발생:',
    //     error.message,
    //   );
    // }
  };

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
      console.log('session::', session);
      if (session) {
        dispatch(login(session.user.identities[0]));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user.isAuthenticated) {
      saveUserToDatabase(user);
    }
  }, [user]);

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
