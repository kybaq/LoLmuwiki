import { useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import styled from 'styled-components';
import google from '../assets/img/google.png';
import github from '../assets/img/github.png';
import kakao from '../assets/img/kakao.png';

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
            <LoginLabel htmlFor="email">Email</LoginLabel>
            <LoginInput
              id="email"
              type="email"
              onChange={() => handleInput('email')}
              ref={emailRef}
              required
            />
            <LoginLabel htmlFor="password">Password</LoginLabel>
            <LoginInput
              id="password"
              type="password"
              onChange={() => handleInput('password')}
              ref={passwordRef}
              required
              minLength="6"
            />

            <LoginBtn>로그인</LoginBtn>
          </InputForm>
          <NotmemberP>
            회원이 아니신가요?
            <button onClick={() => setIsRegistered(false)}>가입</button>
          </NotmemberP>
        </>
      ) : (
        <>
          <SignUpForm setIsRegistered={setIsRegistered} />
          <PrevButton onClick={() => setIsRegistered(true)}>
            이전으로
          </PrevButton>
        </>
      )}

      <SocialLoginHeader>소셜로그인</SocialLoginHeader>
      <SocialBtnWrap>
        <GoogleLoginButton
          kind="google"
          type="button"
          onClick={() => handleSocialLogin('google')}
        />

        <GithubLoginButton
          kind="github"
          type="button"
          onClick={() => handleSocialLogin('github')}
        />

        <KakaoLoginButton
          kind="kakao"
          type="button"
          onClick={() => handleSocialLogin('kakao')}
        />
      </SocialBtnWrap>
    </LoginModalWrap>
  );
}

export default Login;

const LoginModalWrap = styled.div`
  background-color: white;
  height: 90%;
  padding: 20px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const LoginLabel = styled.label`
  margin-bottom: 5px;
`;

const LoginInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #0a1528;
`;

const LoginBtn = styled.button`
  background-color: #0a1528;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;

const PrevButton = styled.button`
  color: #1b76af;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 5px;
`;

const SocialLoginHeader = styled.h1`
  margin-top: 60px;
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
`;

const SocialBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const GoogleLoginButton = styled.button`
  background-image: url(${google});
  background-color: transparent;
  width: 60px;
  height: 60px; /* 이미지의 크기에 맞게 조정 */
  background-size: cover; /* 이미지가 버튼 전체를 채우도록 설정 */
  background-repeat: no-repeat; /* 배경 이미지 반복 없음 */
  border: none;
  cursor: pointer;
`;
const GithubLoginButton = styled.button`
  background-image: url(${github});
  background-color: transparent;
  width: 60px;
  height: 60px; /* 이미지의 크기에 맞게 조정 */
  background-size: cover; /* 이미지가 버튼 전체를 채우도록 설정 */
  background-repeat: no-repeat; /* 배경 이미지 반복 없음 */
  border: none;
  cursor: pointer;
`;
const KakaoLoginButton = styled.button`
  background-image: url(${kakao});
  background-color: transparent;
  width: 60px;
  height: 60px; /* 이미지의 크기에 맞게 조정 */
  background-size: cover; /* 이미지가 버튼 전체를 채우도록 설정 */
  background-repeat: no-repeat; /* 배경 이미지 반복 없음 */
  border: none;
  cursor: pointer;
`;

const NotmemberP = styled.p`
  display: flex;
  align-items: center;

  button {
    margin-left: 10px;
    border: 1px solid black;
    background-color: transparent;
    cursor: pointer;
    width: 60px;
  }
`;
