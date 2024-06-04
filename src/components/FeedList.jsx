import React from 'react';
import styled from 'styled-components';

const StSection = styled.section`
  border: 2px solid #0a1528;
  border-radius: 4px;
  width: 1200px;
  padding: 20px;
`;
const FeedList = () => {
  return (
    <StSection>
      <div>
        게시글 피드
        {/* {filterdList.map((item) => (
          <StLink to={`/detail/${item.id}`} key={item.id}>
            <StDiv>
              <span>{item.date}</span>
            </StDiv>
          </StLink>
        ))} */}
      </div>
    </StSection>
  );
};

export default FeedList;
