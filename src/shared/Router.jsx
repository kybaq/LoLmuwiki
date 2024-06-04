import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Post from '../pages/Post';
import PostViewModal from '../components/PostViewModal';
import GlobalStyle from '../GlobalStyle';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="detail/:id" element={<PostViewModal />} />
          {/* Detail 이란 이름으로 바꾸기 */}
        </Route>
        <Route path="post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
