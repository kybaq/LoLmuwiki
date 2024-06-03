import { supabase } from '../shared/supabaseClient';

function Login() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      console.error('Error logging in with GitHub:', error.message);
    }
  };

  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });

    if (error) {
      console.error('Error logging in with Kakao:', error.message);
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
    </div>
  );
}

export default Login;
