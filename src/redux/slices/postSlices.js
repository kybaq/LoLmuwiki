// import { createSlice } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';
// import { supabase } from '../../shared/supabaseClient';

// // 현재 날짜와 시간 얻기
// const now = new Date();

// // 작성 일자를 문자열로 변환
// const options = {
//   year: 'numeric',
//   month: '2-digit',
//   day: '2-digit',
//   hour: '2-digit',
//   hour12: false,
//   minute: '2-digit',
//   second: '2-digit',
//   timeZoneName: 'short',
// };

// const date = new Intl.DateTimeFormat('ko-KR', options).format(now);

// const fakeData = [
//   {
//     number: 0,
//     id: uuidv4(),
//     title: '지출 내역0',
//     nickName: 'kim',
//     img_url: 'src/assets/react.svg',
//     content: '0',
//   },
//   {
//     number: 1,
//     id: uuidv4(),
//     title: '지출 내역1',
//     nickName: 'kim',
//     user_id: uuidv4(),
//     img_url: 'src/assets/react.svg',
//     content: '1',
//   },
//   {
//     number: 2,
//     id: uuidv4(),
//     title: '지출 내역2',
//     nickName: 'kim',
//     user_id: uuidv4(),
//     img_url: 'src/assets/react.svg',
//     content: '2',
//   },
//   {
//     number: 3,
//     id: uuidv4(),
//     title: '지출 내역3',
//     nickName: 'kim',
//     user_id: uuidv4(),
//     img_url: 'src/assets/react.svg',
//     content: '3',
//   },
//   {
//     nickName: 'kim',
//     user_id: uuidv4(),
//     img_url: 'src/assets/react.svg',
//     content: '4',
//   },
//   {
//     title: '지출 내역5',
//     nickName: 'kim',
//     user_id: uuidv4(),
//     img_url: 'src/assets/react.svg',
//     content: '5',
//   },
//   {
//     title: '지출 내역6',
//     nickName: 'kim',
//     user_id: uuidv4(),
//     img_url: 'src/assets/react.svg',
//     content: '6',
//   },
// ];

// // users
// // 게시글 DB 구조
// // title: titleRef.current.value,
// // user_id: id,
// // nickname: full_name,
// // img_path: images,
// // content: contentRef.current.innerText,
// // user_id: auth.user.id 프로퍼티를 가져옴.
// // id 는 게시글의 id로, SQL 에서 유일한 식별자로서 사용가능 한 것.
// // user_id 는 유저가 여러개의 글을 쓸 수 있으니 기본 키(Primary Key)라고 이야기할 수 없다.

// // 비동기 Thunk 작성
// export const fetchPosts = createAsyncThunk(
//   'totalPosts/fetchPosts',
//   async () => {
//     const { data, error } = await supabase.from('posts').select();
//     if (error) {
//       throw new Error('Error fetching posts:', error);
//     }
//     return data;
//   },
// );

// // const initialState = getPosts() || fakeData;
// // console.log(initialState);

// getPosts();

// const postSlices = createSlice({
//   name: 'posts',
//   // 비동기 작업을 다루는 slice 를 위해 promise 객체의 생명 주기(pending, fulfilled, rejected)에 따라 action creator 가 별도로 필요함
//   // 따라서, 초기 값을 아래 처럼 설정.
//   initialState: {
//     items: [],
//     status: 'idel',
//     error: null,
//   },

//   reducers: {
//     // NOTE: 동기적 처리 === redcuer
//     // readPosts: (state, action) => {
//     //   [...state, ...action.payload];
//     // },
//     // createPost: (state, action) => {},
//     // deletePost: (state, action) => {},
//     // updatePost: (state, action) => {},
//   },
// });

// export const {} = postSlices.actions;
// export default postSlices.reducer;
