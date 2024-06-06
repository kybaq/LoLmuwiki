import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { supabase } from '../shared/supabaseClient';
import styled from 'styled-components';

function SignUpForm({ setIsRegistered }) {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [message, setMessage] = useState('');
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

  async function signUpNewUser(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: signUpInfo.email,
      password: signUpInfo.password,
      options: {
        data: {
          displayName: signUpInfo.email.split('@')[0],
          full_name: signUpInfo.email.split('@')[0],
          avatar_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7P01B1Krx6Tt-gV9oI9kunu5WS45CJctXB5iQZwURfP6IJtHOyWRUsHwvZInc1gBZqrI&usqp=CAU',
        },
      },
    });
    if (error) {
      console.log(error);
      return;
    } else if (data) {
      setIsRegistered(true); // confirm email 횟수 초과 시 사용
    }
  }

  return (
    <SignForm onSubmit={signUpNewUser}>
      <SignLabel htmlFor="email">Email</SignLabel>
      <SignInput
        id="email"
        type="email"
        onChange={() => handleInput('email')}
        ref={emailRef}
      />
      <SignLabel htmlFor="password">Password</SignLabel>
      <SignInput
        id="password"
        type="password"
        onChange={() => handleInput('password')}
        ref={passwordRef}
      />
      <SignBtn>가입</SignBtn>
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
