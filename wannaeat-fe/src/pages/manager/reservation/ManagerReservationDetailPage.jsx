import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getReservationDetail,
  serveOrder,
} from '../../../api/manager/reservation';
import useAlert from '../../../utils/alert';
import calendarIcon from '../../../assets/icons/reservation/calendar.svg';
import clockIcon from '../../../assets/icons/reservation/clock.svg';
import userIcon from '../../../assets/icons/reservation/user.svg';
import {
  ReservationPageContainer,
  ReservationInfo,
  ReservationMenuList,
  MenuItem,
  MenuName,
  MenuControls,
  ButtonGroup,
  CompleteButton,
  IncrementButton,
  DecrementButton,
  ServeCountDisplay,
  InfoRow,
  InfoRowContainer,
  IconImage,
  InfoDetails,
  InfoDetailsContainer,
  FilterButtonGroup,
  FilterButton,
} from './ManagerReservationDetailPage';

const ManagerReservationDetailPage = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [serveCounts, setServeCounts] = useState({});
  const [isServing, setIsServing] = useState(false);
  const [filter, setFilter] = useState('before');
  const showAlert = useAlert();

  useEffect(() => {
    getReservationDetail(id)
      .then((response) => {
        setReservation(response.data);
        const initialServeCounts = response.data.reservationMenuList.reduce(
          (acc, menu) => {
            acc[menu.menuName] = 0;
            return acc;
          },
          {}
        );
        setServeCounts(initialServeCounts);
      })
      .catch((error) => {
        console.error('Error fetching reservation details:', error);
      });
  }, [id]);

  const filteredMenuList = () => {
    if (filter === 'before') {
      return reservation.reservationMenuList.filter(
        (menu) => menu.notServedCnt > 0
      );
    } else {
      return reservation.reservationMenuList.filter(
        (menu) => menu.servedCnt > 0
      );
    }
  };

  const handleServeCountChange = (menuName, increment) => {
    setServeCounts((prevCounts) => {
      const newCount = Math.max(
        0,
        Math.min(
          prevCounts[menuName] + increment,
          reservation.reservationMenuList.find(
            (menu) => menu.menuName === menuName
          ).notServedCnt
        )
      );
      return { ...prevCounts, [menuName]: newCount };
    });
  };

  const handleCompleteServe = async () => {
    const filteredMenus = filteredMenuList();

    // 서빙할 메뉴가 없으면 알림을 띄우고 종료
    if (filteredMenus.length === 0) {
      showAlert('서빙할 메뉴가 없습니다.');
      return;
    }

    // 모든 서빙 수량이 0인 경우 알림을 띄우고 종료
    const totalServeCount = filteredMenus.reduce(
      (total, menu) => total + serveCounts[menu.menuName],
      0
    );

    if (totalServeCount === 0) {
      showAlert('서빙 수량을 입력해주세요.');
      return;
    }

    const orderIdList = [];
    filteredMenus.forEach((menu) => {
      const serveCount = serveCounts[menu.menuName];
      if (serveCount > 0) {
        const availableOrderIds = menu.orderIdList.slice(0, serveCount);
        orderIdList.push(...availableOrderIds);
      }
    });

    setIsServing(true);
    try {
      const response = await serveOrder(id, orderIdList);
      const updatedReservation = {
        ...reservation,
        reservationMenuList: response.data.reservationMenuList,
        allPaymentsCompleted: response.data.allPaymentsCompleted,
      };
      setReservation(updatedReservation);
      const resetServeCounts = reservation.reservationMenuList.reduce(
        (acc, menu) => {
          acc[menu.menuName] = 0;
          return acc;
        },
        {}
      );
      setServeCounts(resetServeCounts);
      showAlert('서빙이 완료되었습니다!');
    } catch (error) {
      console.error('서빙 처리 중 오류 발생:', error);
    } finally {
      setIsServing(false);
    }
  };

  const handleServeAll = async () => {
    const orderIdList = [];
    const filteredMenus = filteredMenuList();

    // 서빙할 메뉴가 없으면 알림을 띄우고 종료
    if (filteredMenus.length === 0) {
      showAlert('서빙할 메뉴가 없습니다.');
      return;
    }

    filteredMenus.forEach((menu) => {
      const availableOrderIds = menu.orderIdList.slice(0, menu.notServedCnt);
      orderIdList.push(...availableOrderIds);
    });

    setIsServing(true);
    try {
      await serveOrder(id, orderIdList);
      const updatedReservation = await getReservationDetail(id);
      setReservation(updatedReservation.data);
      const resetServeCounts =
        updatedReservation.data.reservationMenuList.reduce((acc, menu) => {
          acc[menu.menuName] = 0;
          return acc;
        }, {});
      setServeCounts(resetServeCounts);
      showAlert('전체 서빙이 완료되었습니다!');
    } catch (error) {
      console.error('전체 서빙 처리 중 오류 발생:', error);
    } finally {
      setIsServing(false);
    }
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <ReservationPageContainer>
      {/* 예약 정보 아이콘 섹션 */}
      <ReservationInfo>
        <InfoRowContainer>
          <InfoRow>
            <IconImage src={calendarIcon} alt="calendar icon" />
            <span>
              {reservation.reservationDate}
              {reservation.dayOfWeek ? `(${reservation.dayOfWeek})` : ''}
            </span>
          </InfoRow>
          <InfoRow>
            <IconImage src={clockIcon} alt="clock icon" />
            <span>
              {reservation.reservationStartTime} ~{' '}
              {reservation.reservationEndTime}
            </span>
          </InfoRow>
          <InfoRow>
            <IconImage src={userIcon} alt="user icon" />
            <span>{reservation.memberCnt}명</span>
          </InfoRow>
        </InfoRowContainer>

        {/* 예약 상세 정보 텍스트 섹션 */}
        <InfoDetailsContainer>
          <InfoDetails>
            <p>
              {reservation.allPaymentsCompleted
                ? '전 메뉴 결제 완료'
                : '결제 전'}
            </p>
            <p>
              <strong>예약자:</strong> {reservation.memberName}
            </p>
            <p>
              <strong>테이블 :</strong> {reservation.tableList.join(', ')}
            </p>
          </InfoDetails>
        </InfoDetailsContainer>
      </ReservationInfo>

      {/* 필터 버튼 및 서빙 완료 버튼 그룹 */}
      <FilterButtonGroup>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FilterButton
            active={filter === 'before'}
            onClick={() => handleFilterChange('before')}
          >
            서빙 전
          </FilterButton>
          <FilterButton
            active={filter === 'after'}
            onClick={() => handleFilterChange('after')}
          >
            서빙 후
          </FilterButton>
        </div>

        {/* 서빙 전일 때만 서빙 완료 및 전체 완료 버튼 표시 */}
        {filter === 'before' && (
          <>
            <CompleteButton onClick={handleCompleteServe} disabled={isServing}>
              {isServing ? '서빙 중' : '완료'}
            </CompleteButton>
            <CompleteButton onClick={handleServeAll} disabled={isServing}>
              {isServing ? '서빙 중' : '전체 완료'}
            </CompleteButton>
          </>
        )}
      </FilterButtonGroup>

      {/* 주문 메뉴 리스트 */}
      <ReservationMenuList>
        <h3>주문 메뉴</h3>
        {filteredMenuList().length > 0 ? (
          filteredMenuList().map((menu, index) => (
            <MenuItem key={index}>
              <p>
                <MenuName>{menu.menuName}</MenuName>
              </p>
              <MenuControls>
                {filter === 'before' ? (
                  <>
                    <p>{menu.notServedCnt} 개</p>
                    <ButtonGroup>
                      <DecrementButton
                        onClick={() =>
                          handleServeCountChange(menu.menuName, -1)
                        }
                      >
                        -
                      </DecrementButton>
                      <ServeCountDisplay>
                        {serveCounts[menu.menuName]}
                      </ServeCountDisplay>
                      <IncrementButton
                        onClick={() => handleServeCountChange(menu.menuName, 1)}
                      >
                        +
                      </IncrementButton>
                    </ButtonGroup>
                  </>
                ) : (
                  <p style={{ marginTop: '10px' }}>{menu.servedCnt} 개</p>
                )}
              </MenuControls>
            </MenuItem>
          ))
        ) : (
          <p>
            {filter === 'before'
              ? '서빙 전인 메뉴가 없습니다.'
              : '서빙 후인 메뉴가 없습니다.'}
          </p>
        )}
      </ReservationMenuList>
    </ReservationPageContainer>
  );
};

export default ManagerReservationDetailPage;
