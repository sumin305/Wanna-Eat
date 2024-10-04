import styled from '@emotion/styled';
import theme from 'style/common/theme';
// ${theme.color.primary}

// 페이지 전체 스타일
const NotificationPageContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10%
  padding: 10px;
  font-family: Arial, sans-serif;
`;

// 헤더 스타일 (탭 포함)
const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

   p {
    font-size: 15px; /* 원하는 글자 크기 */
    font-weight: bold; /* 굵게 설정 */
    color: #333; /* 원하는 글자 색상 (옵션) */
    margin-left: 15px;
  }
`;

// 탭 스타일
const NotificationTabs = styled.div`
  display: flex;
  span {
    margin-right: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 13px;
    color: #888;
    padding-bottom: 5px;
    padding-right: 3px;
    border-bottom: 2px solid transparent;

    &:hover {
      color: #000;
    }

    &.active {
      color: #ff4500; /* 활성화된 탭의 색상 */
      border-color: #ff4500; /* 활성화된 탭의 밑줄 */
    }
  }
`;

// 알림 리스트 스타일 (스크롤 가능)
const NotificationList = styled.ul`
  list-style-type: none;
  margin-top: 3px;
  padding: 0;
  height: 400px; /* 스크롤 가능한 높이 설정 */
  overflow-y: auto; /* 스크롤 활성화 */
  
  border: 1px solid #ddd; /* 경계 추가 */
  border-radius: 5px; /* 모서리 둥글게 */
  
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
  }
  
  -ms-overflow-style: none; /* IE, Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

// 알림 항목 스타일 
const NotificationItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ccc !important;
  background-color: #fff; /* 배경색 추가로 구분선 더 명확히 */
  
  &:last-child {
    border-bottom: none; /* 마지막 항목에서는 실선 제거 */
  }
  
  /* 구분선이 더 명확하게 보이도록 마진 조정 */
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

// 알림 아이콘 스타일 (왼쪽에 고정, 가운데 정렬)
const NotificationIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 5px;
  align-self: center; /* 아이콘을 위아래 가운데 정렬 */
  border-radius: 50%;
`;

// 알림 내용 스타일 (가운데 정렬)
const NotificationContent = styled.div`
  flex-grow: 1;
  font-size: 15px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 알림 타입 스타일 (알림 제목)
const NotificationType = styled.div`
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 5px;
`;

// 세부 내용 스타일 (테이블 정보와 세부 사항)
const NotificationDetails = styled.div`
  color: #666;
  font-size: 14px;
`;

// 알림 시간 스타일 (우측에 위치)
const NotificationTime = styled.div`
  color: #888;
  font-size: 13px;
  text-align: right;
  align-self: flex-start;
  margin-top: 10px;
`;

// NotificationEmptyMessage 스타일 추가
const NotificationEmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;  /* 부모 요소의 높이만큼 중앙 정렬 */
  font-size: 17px; /* 글자 크기 조정 */
  color: #888; /* 색상 변경 */
`;

export {
  NotificationPageContainer,
  NotificationHeader,
  NotificationTabs,
  NotificationList,
  NotificationItem,
  NotificationIcon,
  NotificationContent,
  NotificationType,
  NotificationDetails,
  NotificationTime,
  NotificationEmptyMessage
};
