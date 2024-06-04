import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

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
