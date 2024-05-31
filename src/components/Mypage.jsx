import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
`;

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid #ddd;
  padding: 20px;
`;

const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 10px 0;
    cursor: pointer;

    &.active {
      font-weight: bold;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountInfoItem = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Link = styled.a`
  color: blue;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const AccountDelete = styled.div`
  margin-top: 40px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  background-image: none;
  border-color: rgb(195 203 209);
  box-sizing: border-box;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const Mypage = () => {
  return (
    <Container>
      <Sidebar>
        <Nav>
          <ul>
            <li>홈</li>
            <li className="active">계정 관리</li>
            <li>내 게시물</li>
            <li>로그아웃</li>
          </ul>
        </Nav>
      </Sidebar>
      <Content>
        <Title>기본정보</Title>
        <AccountInfo>
          <AccountInfoItem>
            <Label>이메일</Label>
            <Input type="text" value="example@gmail.com" readOnly />
          </AccountInfoItem>
          <AccountInfoItem>
            <Label>비밀번호</Label>
            <Link href="#">비밀번호 재설정하기</Link>
          </AccountInfoItem>
          <AccountInfoItem>
            <Label>닉네임</Label>
            <span>b10조-석재영</span>
            <Link href="#" style={{ marginLeft: '10px' }}>
              수정
            </Link>
          </AccountInfoItem>
          <AccountDelete>
            <h2>계정 삭제하기</h2>
            <DeleteButton>회원 탈퇴</DeleteButton>
          </AccountDelete>
        </AccountInfo>
      </Content>
    </Container>
  );
};

export default Mypage;
