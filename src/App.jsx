import React from 'react';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import { supabase } from './shared/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';

const App = () => {
  // header완성되면 이동할 예정
  const queryClient = useQueryClient();
  const refreshToken = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      throw new Error(error.message);
    }
    // console.log('refreshToken::', data);
    return data;
  };
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error.message);
    } else {
      return data;
    }
  };
  const checkTokenExpiry = async () => {
    try {
      const data = await getSession();
      if (data) {
        const expiresAt = data.expires_at * 1000;
        const timeRemaining = expiresAt - Date.now();
        const test = 30 * 60 * 1000;
        if (timeRemaining <= test) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking token expiry:', error.message);
      return false;
    }
  };

  const { data } = useQuery({
    queryKey: ['refreshToken'],
    queryFn: refreshToken,
    enabled: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      if (await checkTokenExpiry()) {
        queryClient.invalidateQueries(['refreshToken']);
      }
    };
    fetchData();
  }, [queryClient]);
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(['refreshToken']);
    }, 15000);
    return () => clearInterval(interval);
  }, [queryClient]);
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};
export default App;
