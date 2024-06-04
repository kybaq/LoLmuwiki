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
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1.2em;
  text-align: center;
  width: 100%;
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 100%;
`;

const EditButton = styled.a`
  margin-left: 10px;
  padding: 10px 15px;
  font-size: 1em;
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
      <Label>{label}</Label>
      <Value>
        <span>{value}</span>
        {editable && <EditButton href="#" onClick={onEdit}>수정하기</EditButton>}
      </Value>
    </ItemContainer>
  );
};

export default AccountInfoItem;
