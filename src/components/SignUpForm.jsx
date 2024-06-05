import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { supabase } from '../shared/supabaseClient';
import styled from 'styled-components';

function SignUpForm({ setIsRegistered }) {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
  });

  const handleInput = (ref) => {
    if (ref === 'email') {
      setSignUpInfo((prev) => ({
        ...prev,
        email: emailRef.current.value,
      }));
    } else if (ref === 'password') {
      setSignUpInfo((prev) => ({
        ...prev,
        password: passwordRef.current.value,
      }));
    }
  };

  const [message, setMessage] = useState('');
  async function signUpNewUser(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: signUpInfo.email,
      password: signUpInfo.password,
    });
    if (error) {
      console.log(error);
      return;
    } else if (data) {
      setMessage('입력하신 이메일 주소로 confirm email이 전송되었습니다');
      setIsRegistered(true); // confirm email 횟수 초과 시 사용
    }
  }

  return (
    <SignForm onSubmit={signUpNewUser}>
      <SignLabel htmlfor="email">Email</SignLabel>
      <SignInput
        id="email"
        type="email"
        onChange={() => handleInput('email')}
        ref={emailRef}
      />
      <SignLabel htmlfor="password">Password</SignLabel>
      <SignInput
        id="password"
        type="password"
        onChange={() => handleInput('password')}
        ref={passwordRef}
      />
      <SignBtn>가입</SignBtn>
      {message && message}
    </SignForm>
  );
}

export default SignUpForm;

const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SignLabel = styled.label`
  margin-bottom: 5px;
`;

const SignInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #0a1528;
`;

const SignBtn = styled.button`
  background-color: #0a1528;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;
