import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostPage from '../pages/PostPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="posting/" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
