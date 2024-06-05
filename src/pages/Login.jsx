import { useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginInfo.email,
      password: loginInfo.password,
    });
    if (error) {
      console.error(error);
    }
    if (data) {
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
    <div>
      {isRegistered ? (
        <>
          <form onSubmit={signInWithEmail}>
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
            <button>Log in</button>
          </form>
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
    </div>
  );
}

export default Login;
