import React, { useEffect } from 'react';
import { supabase } from '../shared/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

function PostPage() {
  useEffect(() => {
    const getPosts = async () => {
      const { data, error } = await supabase.from('posts').select();
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        console.log('Posts data:', data);
      }
    };

    getPosts();
  }, []);

  const createPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          post_id: uuidv4(),
          title: '테스트 제목 2',
          created_at: new Date().toISOString(),
          user_id: '5b6aedcf-69fa-4614-b0b7-d0b8ad238d49',
          nickname: '김영범',
          img_path:
            'https://cdn.pixabay.com/photo/2024/02/01/22/25/dahlia-8546849_1280.jpg',
          content: '테스트 내용 2',
        },
      ])
      .select('*');

    if (error) {
      console.error('Error creating post:', error);
    } else {
      console.log('Post created:', data);
    }
  };

  return (
    <div>
      <h1>PostPage</h1>
      <button onClick={createPosts}>글 작성</button>
    </div>
  );
}

export default PostPage;
