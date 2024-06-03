import React from 'react';
import Modal from 'react-modal';
import Login from '../pages/Login';

//1. 로그인 클릭시 로그인 모달창 띄우기
//2. 로그인 상태시 로그인을 로그아웃으로 바꾸기
//3. 로그아웃 클릭시 로그아웃

const LoginModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      style={customStyles}
    >
      <Login />
    </Modal>
  );
};

export default LoginModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '400px',
  },
};
