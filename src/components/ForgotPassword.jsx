import { useState } from 'react';
import { supabase } from '../shared/supabaseClient';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  async function handleResetPassword() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset',
    });

    if (error) {
      console.error('Error sending password reset email:', error.message);
    } else {
      console.log('Password reset email sent successfully');
    }
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}

export default ForgotPassword;
