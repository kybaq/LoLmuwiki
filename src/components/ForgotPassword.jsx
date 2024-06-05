import { useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import styled from 'styled-components';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  async function handleResetPassword() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset',
    });

    if (error) {
      console.error('Error sending password reset email:', error.message);
    }
  }

  return (
    <ForgotForm>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Send Reset Email</button>
    </ForgotForm>
  );
}

export default ForgotPassword;

const ForgotForm = styled.form`
  margin-top: 200px;
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
