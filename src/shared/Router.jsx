import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import Myposts from '../pages/Myposts';
import Login from '../pages/Login';
import Header from '../components/Header';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/detail/:id" element={<Detail />} /> */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/myposts" element={<Myposts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
