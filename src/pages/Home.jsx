import Header from '../components/Header';
import styled from 'styled-components';
import Video from '../components/Video';
import FeedList from '../components/FeedList';
import ToTopButton from '../components/ToTopBtn';

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Home = () => {
  return (
    <>
      <StMain>
        <Header />
        <Video />
        <FeedList />
      </StMain>
      <ToTopButton />
    </>
  );
};

export default Home;
