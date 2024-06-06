import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import AccountInfo from '../components/AccountInfo';
import Header from '../components/Header';

const PageContainer = styled.div`
  display: grid;
  grid-template-rows: 50px 300px;
  grid-template-columns: 1fr 3fr;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica', sans-serif;
  line-height: 1.5;
  gap: 100px;
  width: 800px;
  height: 600px;
  background-color: rgba(0, 30, 83, 0.35);
  backdrop-filter: blur(30px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  padding: 15px;
  color: #9a9999;
  border-radius: 8px;
  margin: 20px auto;
  border: none;
  color: white;
  box-shadow: 0 0 1px #8d8d8d, 0 0 3px #8d8d8d, 0 0 6px #8d8d8d,
    0 0 30px #8d8d8d;
  margin-top: 170px;
`;

const Title = styled.h1`
  grid-column: 1 / -1;

  text-align: center;
  font-size: x-large;
`;
const SidebarContainer = styled.div`
  grid-column: 1 / 2;
`;

const Content = styled.div`
  grid-column: 2 / 2;
  justify-content: center;
  margin-top: 20px;
`;

const Mypage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Title>내 계정</Title>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Content>
          <AccountInfo />
        </Content>
      </PageContainer>
    </>
  );
};

export default Mypage;
