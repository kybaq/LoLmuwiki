import React from 'react';
import Modal from 'react-modal';
import Login from '../pages/Login';

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
