import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
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

    &.active {
      font-weight: bold;
    }
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Nav>
        <ul>
          <li>홈</li>
          <li className="active">계정 관리</li>
          <li>내 게시물</li>
          <li>로그아웃</li>
        </ul>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
