import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import PostPage from '../pages/PostPage';
import PostViewModal from '../components/PostViewModal';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} >
          <Route path="detail/:id" element={<PostViewModal />} />
          {/* Detail 이란 이름으로 바꾸기 */}
        </Route>
        <Route path="posting" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
