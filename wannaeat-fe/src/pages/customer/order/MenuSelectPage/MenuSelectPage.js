import styled from '@emotion/styled';
import { symbol } from 'prop-types';
import theme from 'style/common/theme';

// 페이지 전체 스타일
export const MenuPageContainer = styled.div`
  margin-bottom: 20%;
`;

// 탭 스타일
export const WETabContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${theme.color.white};
`;

export const TabText = styled.p`
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
  margin: 5% 7%;
`;

export const CartImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 5px;
  @media (min-width: 480px) {
    width: 22px;
    height: 22px;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
  margin-top: 3%;
  margin-bottom: 2%;
  height: 55vh;
`;

export const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 2% 5%;
  border: 2px solid ${theme.color.disabled};
  border-radius: ${theme.borderRadius.px15};
`;

export const ImageBox = styled.div`
  overflow: hidden;
  left: 0;
  width: 7rem;
  height: 7rem;
  border-radius: ${theme.borderRadius.px15};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuImg = styled.img`
  src: ${(props) => props.src};
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MenuContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 70%;
  padding: 4%;
`;

export const MenuName = styled.p`
  font-size: ${theme.fontSize.px13};
  font-weight: bold;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px15};
  }
`;

export const MenuPrice = styled.p`
  font-size: ${theme.fontSize.px11};
  margin: 8px 0;
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }
`;

export const MenuDescription = styled.p`
  font-size: ${theme.fontSize.px9};
  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px11};
  }
`;
