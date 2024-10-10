import styled from '@emotion/styled';

// 페이지 전체 스타일
export const MenuPageContainer = styled.div`
  padding: 20px;
  margin-bottom: 20%;
  font-family: Arial, sans-serif;
`;

// 카테고리 탭 스타일 (스크롤 시 상단 고정)
export const MenuCategoryTabs = styled.div`
  display: flex;
  margin-bottom: 20px;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  white-space: nowrap; /* 탭들이 한 줄에 유지되도록 함 */
  position: sticky; /* 스크롤 시 상단에 고정 */
  top: 0; /* 화면 상단에 고정 */
  background-color: white; /* 배경색 설정 (투명하지 않게) */
  z-index: 100; /* 다른 요소들보다 위에 위치하도록 설정 */

  /* 스크롤바를 숨김 */
  &::-webkit-scrollbar {
    display: none; /* WebKit 기반 브라우저에서 스크롤바 숨기기 */
  }

  -ms-overflow-style: none; /* IE, Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

// 개별 탭 스타일 (선택된 탭은 강조 표시)
export const MenuTab = styled.div`
  font-size: 18px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#ff4500' : '#ccc')};
  cursor: pointer;
  margin-right: 40px;
  padding-bottom: 10px;
  position: relative;

  &:hover {
    color: #ff4500;
  }

  ${(props) =>
    props.active &&
    `&::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #ff4500;
    }`}
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
  width: 90vw;
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

export const MenuIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

// 하단 우측 + 버튼 스타일 (화면 하단 고정)
export const AddButton = styled.button`
  width: 50px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  position: fixed; /* 화면에 고정 */
  right: 20px; /* 오른쪽에서 20px 떨어짐 */
  bottom: 90px; /* 하단에서 20px 떨어짐 */

  @media (min-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 35px;
  }

  &:hover {
    background-color: #e63900;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

// SettingButton 스타일 추가
export const SettingButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: auto; /* 오른쪽에 배치 */
  img {
    width: 24px;
    height: 24px;
  }
`;
