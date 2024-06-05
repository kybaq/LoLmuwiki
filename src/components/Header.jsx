import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';
import my_profile from '../assets/img/my_profile.png';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../shared/supabaseClient';
import { logout } from '../redux/slices/authSlice';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';

const StContainer = styled.header`
  top: 0;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
  background-color: #0a1528;
  color: white;
  position: fixed;
  z-index: 1000;
  justify-content: space-between;
  box-sizing: border-box;
`;

const StBtnContainer = styled.div`
  display: flex;
  gap: 25px;
  max-width: 100%;
`;

const StAuthBtn = styled.button`
  background-color: #00c8ff;
  border: none;
  color: #0a1528;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #1b76af;
  }
`;

const StLogo = styled.img`
  width: 150px;
  cursor: pointer;
`;

const StMyPage = styled.img`
  width: 45px;
  background-color: #0a1528;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    transform: scale(1.1);
  }
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    isAuthenticated ? setIsLogin(true) : setIsLogin(false);
  }, [isAuthenticated]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsLogin(true);
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(!!isLoggedIn);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('isLoggedIn');
    try {
      await supabase.auth.signOut();
      setIsLogin(false);
      console.log('User logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
    dispatch(logout());
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  // 시승님
  return (
    <>
      <StContainer>
        <StLogo src={logo} onClick={handleLogoClick} />
        <StBtnContainer>
          {isLogin ? (
            <>
              <StAuthBtn onClick={handleLogout}>로그아웃</StAuthBtn>
              <StMyPage src={my_profile} onClick={handleMyPageClick} />
            </>
          ) : (
            <StAuthBtn onClick={() => setIsModalOpen(true)}>로그인</StAuthBtn>
          )}
        </StBtnContainer>
      </StContainer>
      <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  );
};

export default Header;
