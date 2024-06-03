import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostsList from '../components/PostsList';

const Sth5 = styled.h5`
  border: 2px solid black;
  cursor: pointer;
`;

function MainPage() {
  // h5 클릭 시 게시글 작성 페이지로 이동
  const navigation = useNavigate();

  const onHandleClickSearch = () => {
    navigation('posting');
  };

  // 게시글 가져오기

  return (
    <div>
      <Sth5 onClick={onHandleClickSearch}>
        원하는 검색어를 입력해보세요! ex) 이즈리얼, 티모, 정글 동선
      </Sth5>
      <hr />
      <section>
        <article>
          <PostsList />
        </article>
        {/* <Stmodal $active={isModalOpened}>asdfsf</Stmodal> */}

        {/* 위 방법으로도 조건부 렌더링이 가능! */}
      </section>
    </div>
  );
}

export default MainPage;
