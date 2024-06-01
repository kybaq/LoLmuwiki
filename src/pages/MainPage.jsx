import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Sth5 = styled.h5`
  border: 2px solid black;
  cursor: pointer;
`;

function MainPage() {
  const navigation = useNavigate();

  const onHandleClickSearch = () => {
    navigation('posting');
  };

  return (
    <div>
      <Sth5 onClick={onHandleClickSearch}>
        원하는 검색어를 입력해보세요! ex) 이즈리얼, 티모, 정글 동선
      </Sth5>
      <hr />
      <section>
        <article>
          <span>제목</span>
          <div>내용</div>
          클릭하면 모달로 자세히보기 구현
        </article>
      </section>
    </div>
  );
}

export default MainPage;
