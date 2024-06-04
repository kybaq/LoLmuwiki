import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import AccountInfo from '../components/AccountInfo';

const Container = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const MyPage = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>기본정보</Title>
        <AccountInfo />
      </Content>
    </Container>
  );
};

export default MyPage;
