import React from 'react';
import { supabase } from '../shared/supabaseClient';

function PostPage() {
  const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select();
    console.log(data);
  };

  getPosts();

  return <div>PostPage</div>;
}

export default PostPage;
