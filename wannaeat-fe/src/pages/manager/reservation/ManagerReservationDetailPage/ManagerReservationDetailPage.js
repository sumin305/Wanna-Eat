import styled from '@emotion/styled';
import theme from 'style/common/theme';

// 페이지 전체 스타일
export const ReservationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 페이지를 화면 꽉 채우도록 */
  padding: 10px;
  box-sizing: border-box;
`;

// 헤더 스타일
export const ReservationHeader = styled.div`
  margin-bottom: 20px;
  h2 {
    font-size: 15px;
    color: #333;
  }
`;

// 예약 정보 섹션 스타일
export const ReservationInfo = styled.div`
  background-color: #faf3d1;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

// 아이콘과 텍스트를 가로로 정렬하고 가운데 정렬
export const InfoRowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  gap: 45px; /* 아이콘 간격 조정 */
`;

// 아이콘과 텍스트를 세로로 정렬
export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-top: 8px;
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }
`;

export const IconImage = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
`;

// 예약 상세 정보 텍스트 스타일
export const InfoDetailsContainer = styled.div`
  margin-top: 10px;
`;

export const InfoDetails = styled.div`
  padding: 5px;
  p {
    margin: 5px 0;
    font-size: 13px;
    color: #333;
  }
`;

// 주문 메뉴 리스트 스타일
export const ReservationMenuList = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  h3 {
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  /* 고정 높이 및 스크롤 설정 */
  flex-grow: 1;
  max-height: 40%; /* 원하는 크기로 설정 */
  overflow-y: auto; /* 세로 스크롤 활성화 */

  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none; /* WebKit 기반 브라우저에서 스크롤바 숨기기 */
  }

  -ms-overflow-style: none; /* IE, Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

// 개별 메뉴 항목 스타일
export const MenuItem = styled.div`
  margin-bottom: 5px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

// 메뉴 이름 스타일
export const MenuName = styled.span`
  font-weight: bold; /* 진하게 표시 */
  font-size: 13px; /* 원하는 경우 크기도 약간 조정 가능 */
  color: #333; /* 색상 조정 */
`;

// 메뉴 컨트롤 스타일
export const MenuControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 버튼 그룹 스타일
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

// 증감 버튼 스타일
export const IncrementButton = styled.button`
  background-color: #e67e22;
  color: white;
  border: 1px solid #e67e22;
  padding: 5px 7px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 20px; /* 둥글게 만듦 */
  cursor: pointer;
  margin-left: 3px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #e67e22;
  }
`;

export const DecrementButton = styled.button`
  background-color: #e67e22;
  color: white;
  border: 1px solid #e67e22;
  padding: 5px 8px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 20px; /* 둥글게 만듦 */
  cursor: pointer;
  margin-left: 3px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #e67e22;
  }
`;

// 서빙 수량 표시 스타일
export const ServeCountDisplay = styled.div`
  font-size: 13px;
  font-weight: bold;
  padding: 0 10px;
`;

// 필터 버튼 그룹 스타일
export const FilterButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 5px; /* 필터 버튼과 전체 서빙 완료 버튼 간격 조정 */
`;

export const ReservationPayInfo = styled.p`
  font-weight: bold;
  font-size: ${theme.fontSize.px17};
  margin: 0.3rem;
`;

export const ReservationPayInfoWrapper = styled.div`
  display: flex;
  margin: 0.3rem;
`;
// 필터 버튼 스타일
export const FilterButton = styled.button`
  background: none;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 15px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? theme.color.primary : '#ccc')};
  position: relative;
  cursor: pointer;

  &:hover {
    color: ${theme.color.primary};
  }

  &::after {
    content: '';
    display: ${(props) => (props.active ? 'block' : 'none')};
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${theme.color.primary};
  }
`;

// 서빙 완료 및 전체 서빙 완료 버튼 스타일
export const CompleteButton = styled.button`
  background-color: ${theme.color.primary};
  color: white;
  border: 1px solid ${theme.color.primary};
  padding: 5px 5px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 20px; /* 둥글게 만듦 */
  cursor: pointer;
  margin-left: 3px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #e67e22;
  }
`;
