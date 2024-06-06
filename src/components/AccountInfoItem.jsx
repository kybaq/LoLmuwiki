import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.2em;
  text-align: center;
  width: 100%;
  & > span {
    font-weight: bold;
  }
`;

const EditButton = styled.a`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 0.7em;
  align-items: center;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #3489e4;
  }
`;

const AccountInfoItem = ({ label, value, editable, onEdit }) => {
  return (
    <ItemContainer>
      <Label>
        <span>{label}:ㅤ</span> {value}
        {editable && (
          <EditButton href="#" onClick={onEdit}>
            수정하기
          </EditButton>
        )}
      </Label>
    </ItemContainer>
  );
};

export default AccountInfoItem;
