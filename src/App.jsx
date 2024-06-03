import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Mypage from './pages/MyPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </Router>
  );
};

export default App;
