import { supabase } from '../shared/supabaseClient';

function Login() {
  const redirectUrl = window.location.href.split('#')[0];
  const handleSocialLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      console.error(`Error logging in with ${provider}:`, error.message);
    }
  };

  return (
    <div>
      <h1>Supabase Social Login</h1>
      <button type="button" onClick={() => handleSocialLogin('google')}>
        Login with Google
      </button>
      <button type="button" onClick={() => handleSocialLogin('github')}>
        Login with GitHub
      </button>
      <button type="button" onClick={() => handleSocialLogin('kakao')}>
        Login with Kakao
      </button>
    </div>
  );
}

export default Login;