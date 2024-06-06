import { useState, useRef } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import styled from 'styled-components';
import google from '../assets/img/google.png';
import github from '../assets/img/github.png';
import kakao from '../assets/img/kakao.png';
import ForgotPassword from '../components/ForgotPassword';
import { login } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

function Login({ onRequestClose }) {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

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

  const getUserSession = async () => {
    const { data } = await supabase.auth.getSession();
    return data;
  };

  const saveUserToDatabase = async (user) => {
    console.log('user::', user);
    const userData = {
      user_id: user.identities[0].id,
      full_name: user.identities[0].identity_data.full_name,
      avatar_url: user.identities[0].identity_data.avatar_url,
      email: user.identities[0].identity_data.email,
      created_at: user.identities[0].created_at,
    };

    try {
      const { error } = await supabase.from('users').upsert([userData]);
      if (error) {
        console.error(
          '유저 정보를 데이터베이스에 저장하는 중 에러 발생:',
          error.message,
        );
      } else {
        console.log('유저 정보를 데이터베이스에 성공적으로 저장');
      }
    } catch (error) {
      console.error(
        '유저 정보를 데이터베이스에 저장하는 중 에러 발생:',
        error.message,
      );
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
      alert('회원정보가 일치하지 않습니다');
      return;
    } else if (data) {
      localStorage.setItem('isLoggedIn', 'true');
      const { session } = await getUserSession();

      if (session) {
        dispatch(login(session.user.identities[0]));
        saveUserToDatabase(session.user);
      }

      onRequestClose();
      navigate(`${location.pathname}`);
    }
  }

  const handleSocialLogin = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(`Error logging in with ${provider}:`, error.message);
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
          <ForgotPwd onClick={() => setIsForgot((prev) => !prev)}>
            비밀번호를 잊으셨나요?
          </ForgotPwd>
          {isForgot && <ForgotPassword />}
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
  position: absolute;
  bottom: 120px;
  left: 220px;
`;

const SocialBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  position: absolute;
  bottom: 70px;
  left: 130px;
`;

const GoogleLoginButton = styled.button`
  background-image: url(${google});
  background-color: transparent;
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;
const GithubLoginButton = styled.button`
  background-image: url(${github});
  background-color: transparent;
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;
const KakaoLoginButton = styled.button`
  background-image: url(${kakao});
  background-color: transparent;
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;

const NotmemberP = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  button {
    margin-left: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 15px;
  }
`;

const ForgotPwd = styled.p`
  cursor: pointer;
`;
