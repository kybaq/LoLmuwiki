import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { supabase } from '../shared/supabaseClient';

const SidebarContainer = styled.div`
  width: 150px;
  border-right: 1px solid #ddd;
  padding: 20px;
`;

const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 10px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 4px;
    margin-bottom: 10px;

    &:hover {
      background-color: #c8aa6e;
    }

    &.active {
      font-weight: bold;
      background-color: #c8aa6e;
    }
  }
  text-align: center;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsAuthenticated(user.aud);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleNavigation = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('isLoggedIn');
      await supabase.auth.signOut();
      dispatch(logout());
      localStorage.removeItem('isLoggedIn');
      alert('로그아웃 되었습니다');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <SidebarContainer>
      <Nav>
        <ul>
          <li
            onClick={() => handleNavigation('/')}
            className={window.location.pathname === '/' ? 'active' : ''}
          >
            홈
          </li>
          <li
            onClick={() => handleNavigation('/mypage')}
            className={window.location.pathname === '/mypage' ? 'active' : ''}
          >
            계정 관리
          </li>
          <li
            onClick={() => handleNavigation('/myposts')}
            className={window.location.pathname === '/myposts' ? 'active' : ''}
          >
            내 게시물
          </li>
          <li onClick={handleLogout}>로그아웃</li>
        </ul>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
