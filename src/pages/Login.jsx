import { useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import styled from 'styled-components';

function Login({ onRequestClose }) {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const location = useLocation();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  // const [message, setMessage] = useState('')

  const handleInput = (ref) => {
    if (ref === 'email') {
      setLoginInfo((prev) => ({
        ...prev,
        email: emailRef.current.value,
      }));
    } else if (ref === 'password') {
      setLoginInfo((prev) => ({
        ...prev,
        password: passwordRef.current.value,
      }));
    }
  };

  async function signInWithEmail(e) {
    e.preventDefault();
    if (loginInfo.email === '' || loginInfo.password === '') {
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginInfo.email,
      password: loginInfo.password,
    });
    if (error) {
      // console.error(error);
      alert('회원정보가 일치하지 않습니다');
      return;
    } else if (data) {
      onRequestClose();
      navigate(`${location.pathname}`);
    }
  }

  const handleSocialLogin = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });

    if (error) {
      console.error(`Error logging in with ${provider}:`, error.message);
    }
    if (data) {
      onRequestClose();
      navigate(`${location.pathname}`);
    }
  };

  return (
    <LoginModalWrap>
      {isRegistered ? (
        <>
          <InputForm onSubmit={signInWithEmail}>
            <label htmlFor="email">Email</label>
            <LoginInput
              id="email"
              type="email"
              onChange={() => handleInput('email')}
              ref={emailRef}
              required
            />
            <label htmlFor="password">Password</label>
            <LoginInput
              id="password"
              type="password"
              onChange={() => handleInput('password')}
              ref={passwordRef}
              required
              minLength="6"
            />

            <button>Log in</button>
          </InputForm>
          <p>
            회원이 아니신가요?
            <button onClick={() => setIsRegistered(false)}>Join</button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm setIsRegistered={setIsRegistered} />
          <button onClick={() => setIsRegistered(true)}>Prev</button>
        </>
      )}

      <h1>Supabase Social Login</h1>
      <button type="button" onClick={() => handleSocialLogin('google')}>
        {isRegistered ? 'Login with Google' : 'Join With Google'}
      </button>
      <button type="button" onClick={() => handleSocialLogin('github')}>
        {isRegistered ? 'Login with Github' : 'Join With Github'}
      </button>
      <button type="button" onClick={() => handleSocialLogin('kakao')}>
        {isRegistered ? 'Login with Kakao' : 'Join With Kakao'}
      </button>
    </LoginModalWrap>
  );
}

export default Login;

const LoginModalWrap = styled.div`
  background-color: white;
  /* height: 100%; */
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginInput = styled.input``;
