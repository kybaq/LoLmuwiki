import { useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  localStorage.setItem('isLoggedIn', 'true');

  useEffect(() => {
    const getUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      return data;
    };

    const saveUserToDatabase = async (user) => {
      const userData = {
        user_id: user.id,
        full_name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
        email: user.email,
        created_at: user.created_at,
      };

      try {
        console.log('userData::', userData);
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

    const handleAuthCallback = async () => {
      const { session } = await getUserSession();
      if (session) {
        dispatch(login(session.user.identities[0]));
        console.log('session dispatch');
        await saveUserToDatabase(session.user);
        navigate('/'); // 리다이렉트할 경로
      }
    };

    handleAuthCallback();
  }, [dispatch, navigate]);

  return <div>로그인 중...</div>;
}

export default AuthCallback;
