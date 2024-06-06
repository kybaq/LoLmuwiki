import { useState } from 'react';
import { supabase } from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error('Error updating password:', error.message);
    } else {
      console.log('Password updated successfully');
      navigate('/');
    }
  }

  return (
    <ResetForm onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </ResetForm>
  );
}

export default ResetPassword;

const ResetForm = styled.form`
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
