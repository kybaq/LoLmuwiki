import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Post from '../pages/Post';
import PostViewModal from '../components/PostViewModal';
import MyPage from '../pages/MyPage';
import MyPosts from '../pages/MyPosts';
import ResetPassword from '../components/ResetPassword';
import AuthCallback from '../shared/AuthCallback';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/detail/:id" element={<PostViewModal />} />
        </Route>
        <Route path="/post" element={<Post />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
