import { supabase } from '../shared/supabaseClient';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      console.log('User logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
