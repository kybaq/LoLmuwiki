import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Post from '../pages/Post';
import PostViewModal from '../components/PostViewModal';
import MyPage from '../pages/MyPage';
import MyPosts from '../pages/MyPosts';
import Login from '../pages/Login';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';

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
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
