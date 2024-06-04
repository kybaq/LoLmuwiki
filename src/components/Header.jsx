import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../shared/supabaseClient';
import { logout } from '../redux/slices/authSlice';
import { useEffect, useState } from 'react';

const StContainer = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
  background-color: #0a1528;
  color: white;
  position: fixed;
  top: 0;
  z-index: 1000;
  justify-content: space-between;
`;

const StBtnContainer = styled.div`
  display: flex;
  float: right;
  gap: 10px;
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

const StMyPage = styled.button`
  background-color: #ffffff;
  border: 1px solid #00c8ff;
  color: #0a1528;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = ({ handleLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    isAuthenticated ? setIsLogin(true) : setIsLogin(false);
  }, [isAuthenticated]);

  const handleLogout = async () => {
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

  return (
    <StContainer>
      <StLogo src={logo} onClick={handleLogoClick} />
      {isLogin ? (
        <StBtnContainer>
          <StAuthBtn onClick={handleLogout}>로그아웃</StAuthBtn>
          <StMyPage onClick={handleMyPageClick}>내 계정</StMyPage>
        </StBtnContainer>
      ) : (
        <StBtnContainer>
          <StAuthBtn onClick={handleLogin}>로그인</StAuthBtn>
        </StBtnContainer>
      )}
    </StContainer>
  );
};

export default Header;
