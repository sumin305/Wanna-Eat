import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 추가
import { getAlarms } from '../../../api/manager/alarm/alarm'; // API 함수 임포트
import {
  AlarmPageContainer,
  AlarmHeader,
  AlarmTabs,
  AlarmList,
  AlarmItem,
  AlarmIcon,
  AlarmContent,
  AlarmType,
  AlarmTime,
  AlarmEmptyMessage
} from './alarm'; 

const AlarmPage = () => {
  const [alarms, setAlarms] = useState([]); // 알림 데이터를 상태로 관리
  const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리 상태
  const [filteredAlarms, setFilteredAlarms] = useState([]); // 필터링된 알림 상태

  // API를 통해 알림 데이터를 불러오는 함수
  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const result = await getAlarms();
        setAlarms(result.data); // API에서 받은 데이터를 상태에 저장
      } catch (error) {
        console.error('알림 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchAlarms();
  }, []);

  // 알림 타입을 한글로 변환하는 함수 (UI에 출력할 때 사용)
  const translateAlarmType = (alarmType) => {
    switch (alarmType) {
      case 'RESERVATION_CONFIRMED':
        return '예약신청';
      case 'RESERVATION_CANCELED':
        return '예약취소';
      case 'EXIT_COMPLETED':
        return '퇴실완료';
      case 'ORDER_ADDED':
        return '메뉴주문';
      default:
        return alarmType;
    }
  };

  // 카테고리 변경 시 필터링된 알림 목록을 업데이트
  useEffect(() => {
    if (!alarms.length) return; // 데이터가 로드되지 않았으면 필터링하지 않음

    if (selectedCategory === '전체') {
      setFilteredAlarms(alarms); // '전체' 선택 시 모든 알림 표시
    } else {
      const filtered = alarms.filter((alarm) => {
        // 알림 타입을 영어로 필터링 (한글로 출력할 때만 변환)
        return alarm.alarmType === selectedCategory;
      });
      setFilteredAlarms(filtered); // 필터링된 알림을 상태에 저장
    }
  }, [selectedCategory, alarms]);

  // 카테고리 변경 함수
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <AlarmPageContainer>
      <AlarmHeader>
        <p>
          {selectedCategory === '전체'
            ? '전체'
            : translateAlarmType(selectedCategory)}
        </p>
        {/* 카테고리 선택 탭 */}
        <AlarmTabs>
          <span
            onClick={() => handleCategoryChange('전체')}
            className={selectedCategory === '전체' ? 'active' : ''}
          >
            전체
          </span>
          <span
            onClick={() => handleCategoryChange('ORDER_ADDED')}
            className={selectedCategory === 'ORDER_ADDED' ? 'active' : ''}
          >
            메뉴주문
          </span>
          <span
            onClick={() => handleCategoryChange('RESERVATION_CONFIRMED')}
            className={
              selectedCategory === 'RESERVATION_CONFIRMED' ? 'active' : ''
            }
          >
            예약신청
          </span>
          <span
            onClick={() => handleCategoryChange('RESERVATION_CANCELED')}
            className={
              selectedCategory === 'RESERVATION_CANCELED' ? 'active' : ''
            }
          >
            예약취소
          </span>
          <span
            onClick={() => handleCategoryChange('EXIT_COMPLETED')}
            className={selectedCategory === 'EXIT_COMPLETED' ? 'active' : ''}
          >
            퇴실완료
          </span>
        </AlarmTabs>
      </AlarmHeader>

      {/* 알림 리스트 */}
      <AlarmList>
        {filteredAlarms.length === 0 ? (
          <AlarmEmptyMessage>
            해당 카테고리에 알림이 없습니다.
          </AlarmEmptyMessage>
        ) : (
          filteredAlarms.map((alarm, index) => (
            <Link
              to={`/manager/reservation/reservation-detail/${alarm.reservationId}`}
              key={`${alarm.reservationId}-${index}`} // 고유 키 설정
              style={{ textDecoration: 'none', color: 'inherit' }} // 링크 스타일
            >
              <AlarmItem>
                <AlarmIcon
                  src={alarm.imageUrl}
                  alt="알림 아이콘"
                />
                <AlarmContent>
                  <AlarmType>
                    [{translateAlarmType(alarm.alarmType)}]
                  </AlarmType>
                  <div>예약 인원: {alarm.memberCnt}명</div>{' '}
                  {/* 예약 인원 표시 */}
                  {alarm.menuName && ( // 메뉴가 있을 때만 렌더링
                    <div>{alarm.menuName} 추가</div>
                  )}
                  <AlarmTime>{alarm.registTime}</AlarmTime>
                </AlarmContent>
              </AlarmItem>
            </Link>
          ))
        )}
      </AlarmList>
    </AlarmPageContainer>
  );
};

export default AlarmPage;
