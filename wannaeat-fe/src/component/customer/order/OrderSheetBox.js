import styled from '@emotion/styled';
import theme from 'style/common/theme';

export const TotalPriceText = styled.p`
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.primary};
  margin-right: 5%;
`;

export const MenuDiv = styled.div`
  /* background-color: rgba(212, 212, 212, 0.3); */
  padding: 4vw;
  height: 45vh;
  overflow-y: auto;
  -ms-overflow-style: none; /* 인터넷 익스플로러용 스크롤바 숨김 */
  scrollbar-width: none; /* 파이어폭스용 스크롤바 숨김 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 엣지 등 웹킷 브라우저용 스크롤바 숨김 */
  }
`;
