import { useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import styled from 'styled-components';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSend, setIsSend] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {      
      redirectTo: `${window.location.origin}/reset`,
    });

    if (error) {
      console.error('Error sending password reset email:', error.message);
    } else if (data) {
      setIsSend(true);
    }
  }

  return (
    <>
      <ForgotForm>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleResetPassword}>
          {isSend ? '전송완료' : 'Send Reset Email'}
        </button>
      </ForgotForm>
    </>
  );
}

export default ForgotPassword;

const ForgotForm = styled.form`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;

  input {
    width: 250px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #0a1528;
  }

  button {
    background-color: #0a1528;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
`;
