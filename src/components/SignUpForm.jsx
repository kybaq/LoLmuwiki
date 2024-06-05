import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { supabase } from '../shared/supabaseClient';

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
    <form onSubmit={signUpNewUser}>
      <input
        type="email"
        onChange={() => handleInput('email')}
        ref={emailRef}
      />
      <input
        type="password"
        onChange={() => handleInput('password')}
        ref={passwordRef}
      />
      <button>sign up</button>
      {message && message}
    </form>
  );
}

export default SignUpForm;
