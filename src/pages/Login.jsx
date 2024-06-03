import { useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import LogoutButton from '../components/LogoutButton';

function Login() {
  const [session, setSession] = useState(null);

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in with Google:', error.message);
    } else {
      setSession(data);
    }
  };

  const handleGitHubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      console.error('Error logging in with GitHub:', error.message);
    } else {
      setSession(data);
    }
  };

  const handleKakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });

    if (error) {
      console.error('Error logging in with Kakao:', error.message);
    } else {
      setSession(data);
    }
  };

  return (
    <div>
      <h1>Supabase Social Login</h1>
      <button type="button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
      <button type="button" onClick={handleGitHubLogin}>
        Login with GitHub
      </button>
      <button type="button" onClick={handleKakaoLogin}>
        Login with Kakao
      </button>
      <LogoutButton />
    </div>
  );
}

export default Login;
