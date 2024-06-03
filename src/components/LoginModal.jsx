import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

//1. 로그인 클릭시 로그인 모달창 띄우기
//2. 로그인 상태시 로그인을 로그아웃으로 바꾸기
//3. 로그아웃 클릭시 로그아웃

const LoginModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
    >
      <form>{/* 소셜 로그인 로직 */}</form>
    </Modal>
  );
};

export default LoginModal;
