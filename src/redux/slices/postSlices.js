import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// 현재 날짜와 시간 얻기
const now = new Date();

// 작성 일자를 문자열로 변환
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hour12: false,
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short',
};

const date = new Intl.DateTimeFormat('ko-KR', options).format(now);

const fakeData = [
  {
    number: 0,
    id: uuidv4(),
    title: '지출 내역0',
    date,
    // category: '식비',
    writer: {
      social: 'kim',
      uid: uuidv4(),
    },
    content: ['src/assets/react.svg', '0'],
  },
  {
    number: 1,
    id: uuidv4(),
    title: '지출 내역1',
    date,
    // category: '식비',
    writer: {
      social: 'kim',
      uid: uuidv4(),
    },
    content: ['src/assets/react.svg', '1'],
  },
  {
    number: 2,
    id: uuidv4(),
    title: '지출 내역2',
    date,
    // category: '식비',
    writer: {
      social: 'kim',
      uid: uuidv4(),
    },
    content: ['src/assets/react.svg', '2'],
  },
  {
    number: 3,
    id: uuidv4(),
    title: '지출 내역3',
    date,
    // category: '식비',
    writer: {
      social: 'kim',
      uid: uuidv4(),
    },
    content: ['src/assets/react.svg', '3'],
  },
  {
    number: 4,
    id: uuidv4(),
    title: '지출 내역4',
    date,
    // category: '식비',
    writer: {
      social: 'kim',
      uid: uuidv4(),
    },
    content: ['src/assets/react.svg', '4'],
  },
  {
    number: 5,
    id: uuidv4(),
    title: '지출 내역5',
    date,
    // category: '식비',
    writer: {
      social: 'kim',
      uid: uuidv4(),
    },
    content: ['src/assets/react.svg', '5'],
  },
  {
    number: 6,
    id: uuidv4(),
    title: '지출 내역6',
    date,
    // category: '식비',
    writer: {
      social: 'kim',
      uid: uuidv4(),
    },
    content: ['src/assets/react.svg', '6'],
    likes: 0,
    comment: {},
  },
];

// 게시글 DB 구조 id: 게시글 uuid, content, img_url, created_at,
// user_id: auth.user.id 를 가져옴
// id 는 게시글의 id로, SQL 에서 유일한 식별자로서 사용가능 한 것.
// user_id 는 유저가 여러개의 글을 쓸 수 있으니 기본 키(Primary Key)라고 이야기할 수 없다.

const postSlices = createSlice({
  name: 'totalPosts',
  initialState: fakeData,
  reducers: {
    // NOTE: redcuer 구현
  },
});

export const {} = postSlices.actions;
export default postSlices.reducer;