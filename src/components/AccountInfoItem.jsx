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

const AccountInfoItem = ({ label, value }) => {
  return (
    <ItemContainer>
      <Label>{label}</Label>
      <Value>
        <span>{value}</span>
      </Value>
    </ItemContainer>
  );
};

export default AccountInfoItem;
