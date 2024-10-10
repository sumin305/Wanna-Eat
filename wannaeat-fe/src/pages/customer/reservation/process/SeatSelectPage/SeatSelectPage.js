import styled from '@emotion/styled/macro';
import theme from 'style/common/theme.js';

const SeatSelectPageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 56vh 1fr;
  justify-content: center;
`;

const MemberCountSyled = styled.div`
  font-size: ${theme.fontSize.px15};
  font-weight: bold;
  text-align: end;
  margin-right: 2%;
`;

export { SeatSelectPageContainer, MemberCountSyled };
