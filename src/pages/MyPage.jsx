import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import AccountInfo from '../components/AccountInfo';

const PageContainer = styled.div`
  display: flex;
  justify-content: center; 
  font-family: Arial, sans-serif;
`;

const InnerContainer = styled.div`
  display: flex;
  max-width: 1200px; 
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: x-large;
`;

const Mypage = () => {
  return (
    <PageContainer>
      <InnerContainer>
        <Sidebar />
        <Content>
          <Title>내 계정</Title>
          <AccountInfo />
        </Content>
      </InnerContainer>
    </PageContainer>
  );
};

export default Mypage;
