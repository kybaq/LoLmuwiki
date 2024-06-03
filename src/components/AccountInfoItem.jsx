import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const AccountInfoItem = ({ label, children }) => {
  return (
    <ItemContainer>
      <Label>{label}</Label>
      {children}
    </ItemContainer>
  );
};

export default AccountInfoItem;
