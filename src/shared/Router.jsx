import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Post from '../pages/Post';
import PostViewModal from '../components/PostViewModal';
import Mypage from '../pages/Mypage';
import MyPosts from '../pages/MyPosts';
import Login from '../pages/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="detail/:id" element={<PostViewModal />} />
          {/* Detail 이란 이름으로 바꾸기 */}
        </Route>
        <Route path="post" element={<Post />} />
        {/* <Route path="/detail/:id" element={<Detail />} /> */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
