import { useSelector } from 'react-redux';
import PostItem from './PostItem';

function PostsList() {
  const totalPosts = useSelector((state) => state.totalPosts); // 전체 데이터 가지고 옴

  return (
    <ul>
      {totalPosts.map((post) => (
        <PostItem
          style={{
            margin: '10px',
            cursor: 'pointer',
          }}
          key={post.id}
          post={post}
        />
      ))}
    </ul>
  );
}

export default PostsList;
