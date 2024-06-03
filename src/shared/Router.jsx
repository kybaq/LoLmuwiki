import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostPage from '../pages/PostPage';
import PostViewModal from '../components/PostViewModal';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="detail/:id" element={<PostViewModal />} />
        </Route>
        <Route path="posting" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
