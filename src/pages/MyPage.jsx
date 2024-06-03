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

const Mypage = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>내 정보</Title>
        <AccountInfo />
      </Content>
    </Container>
  );
};

export default Mypage;
