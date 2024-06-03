import { useEffect, useRef, useState } from 'react';
import PostViewModal from './PostViewModal';
import { useNavigate } from 'react-router-dom';

function PostItem({ post }) {
  const navigation = useNavigate();
  // 게시글 클릭 시 모달 창 출력
  const [isModalOpened, setModalOpened] = useState(false);

  const onHandleClickPost = (post) => {
    navigation(`detail/${post.id}`); // 상세페이지로 라우팅
    setModalOpened(true); // 모달 창 열기
    setActivePost(post); // 클릭한 게시글
  };

  // 실제 클릭한 Post 선택
  const [activePost, setActivePost] = useState(null);

  // 모달 영역 지정을 위한 변수
  const modalRef = useRef(null);

  // 실제 글 목록과, 모달 부분을 제외한 영역을 클릭한 경우 모달 닫힘
  useEffect(() => {
    const clickOutside = (evt) => {
      if (
        isModalOpened && // 모달이 열려있으면서
        modalRef.current && // 게시글 목록이 존재하고
        !modalRef.current.contains(evt.target) // mousedown 이벤트 발생 대상이 게시글 목록 부분이 아니라면,
      ) {
        setModalOpened(false); // 모달 닫음
        navigation('/'); // 홈으로 이동
      }
    };

    document.addEventListener('mousedown', clickOutside); // 이벤트 리스너 추가

    return () => {
      document.removeEventListener('mousedown', clickOutside); // 동작하고 나면 즉시 삭제
    };
  }, [isModalOpened]);

  return (
    <>
      <li onClick={() => onHandleClickPost(post)}>
        <div
          style={{
            cursor: 'pointer',
          }}
        >
          <img src={`${post.img_url}`} alt="리액트 로고" />
          {post.content}
        </div>
        <div ref={modalRef}>
          {isModalOpened ? <PostViewModal post={activePost} /> : null}
        </div>
      </li>
    </>
  );
}

export default PostItem;
