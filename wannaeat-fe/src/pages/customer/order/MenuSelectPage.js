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

// 메뉴 항목 리스트 스타일
export const MenuItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 좌우 중앙 정렬 */
  gap: 30px; /* 카드들 간의 간격 */
  /* 컨테이너 높이는 그대로 유지 */
`;

// 개별 메뉴 카드 스타일
export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  max-width: 400px;
  min-width: 300px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  position: relative; /* 아이콘 배치를 위해 추가 */
`;

// 메뉴 이미지 스타일
export const MenuImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 15px;
`;

// 메뉴 정보 스타일 (제목, 설명 등)
export const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

// 메뉴 제목 스타일
export const MenuTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 10px;
  color: #333;
`;

// 메뉴 설명 스타일
export const MenuDescription = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #333;
`;

// 메뉴 가격 스타일
export const MenuPrice = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin: 5px 0;
`;

export const MenuIcons = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 12px; /* 아이콘 간 간격 */
`;

export const CartImg = styled.img`
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 5%;
  height: 10%;
  cursor: pointer;
`;
