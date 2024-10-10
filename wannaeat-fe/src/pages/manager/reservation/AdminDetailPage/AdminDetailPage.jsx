import { useEffect, useState } from 'react';
import useHeaderStore from '../../../../stores/common/useHeaderStore';
import styled from '@emotion/styled/macro';
import theme from '../../../../style/common/theme';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore';
import useAnimationStore from 'stores/common/useAnimationStore';
const AdminDetailPage = () => {
  const {
    setPageName,
    setIsCarrot,
    setActiveIcons,
    setIsUnderLine,
    setIsShowLogo,
  } = useHeaderStore();
  const { reservationList, setReservationList } = useMyRestaurantStore();
  const params = useParams();
  const date = params.date;
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { setBeforeUrl } = useAnimationStore();
  useEffect(() => {
    setPageName('예약 관리');
    setIsCarrot(false);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setIsShowLogo(false);
    setBeforeUrl('/manager/admin/detail');
  }, []);

  useEffect(() => {
    return () => {
      setBeforeUrl('');
    };
  }, []);
  // 스크롤이 발생 시 페이지ㅣ 이동
  const onScrollFunction = (e) => {
    console.log(e.deltaY);
    if (e.deltaY < 0) {
      navigate('/manager/admin');
    }
  };

  // 예약 상세 페이지로 이동
  const handleReservationInfoClick = (id) => {
    navigate('/manager/reservation/reservation-detail/' + id);
  };
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5 }}
      onWheel={(e) => onScrollFunction(e)}
    >
      <Topbar>
        <TopbarButton>{`<`}</TopbarButton>
        <TobbarDateText>{date}</TobbarDateText>
        <TopbarButton>{`>`}</TopbarButton>
      </Topbar>

      <TabContainer>
        <Tab onClick={() => setActiveTab(0)} active={activeTab === 0}>
          <p>방문 예정</p>
          <hr></hr>
        </Tab>
        <Tab onClick={() => setActiveTab(1)} active={activeTab === 1}>
          <p>방문중</p>
          <hr></hr>
        </Tab>
        <Tab onClick={() => setActiveTab(2)} active={activeTab === 2}>
          <p>방문 완료</p>
          <hr></hr>
        </Tab>
      </TabContainer>
      <ReservationInfoContainer>
        {reservationList.map((reservation) => (
          <ReservationInfoItem
            onClick={() =>
              handleReservationInfoClick(reservation.reservationId)
            }
            key={reservation.reservationId}
          >
            <ReservationInfoImage />
            <ReservationInfoText>
              <ReservationTopInfo>
                <ReservationText>
                  [
                  {activeTab === 0
                    ? '방문 예정'
                    : activeTab === 1
                      ? '방문 중'
                      : '방문 완료'}
                  ]
                </ReservationText>
                <ReservationText>
                  {reservation.reservationStartTime}~
                  {reservation.reservationEndTime}
                </ReservationText>
              </ReservationTopInfo>
              <ReservationBottomInfo>
                <ReservationText>
                  {reservation.reservationTableList &&
                    reservation.reservationTableList.map((table) => (
                      <ReservationText>{table} </ReservationText>
                    ))}{' '}
                </ReservationText>{' '}
                <ReservationText>번 테이블&nbsp;</ReservationText>
                <ReservationText>{reservation.memberCount}명</ReservationText>
              </ReservationBottomInfo>
            </ReservationInfoText>
          </ReservationInfoItem>
        ))}
      </ReservationInfoContainer>
    </motion.div>
  );
};

export default AdminDetailPage;

const AdminDetailPageContainer = styled.div``;

const Topbar = styled.div`
  background-color: ${theme.color.primary};
  display: flex;
  height: 24px;
  align-items: center;
  justify-content: center;
  > * {
    margin: 0 0.5rem;
  }
`;

const TopbarButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  color: white;
`;
const TobbarDateText = styled.p`
  font-weight: bold;
  color: white;
`;
const TabContainer = styled.div`
  display: flex;
  padding: 0.625rem 0;
  max-width: 100vw;
  position: relative;
`;
const Tab = styled.div`
  flex: 0 auto;
  padding: 0.625rem 1rem;

  font-size: ${theme.fontSize.px11};
  > p {
    font-weight: ${(props) => (props.active ? 'bold' : 500)};
    color: ${(props) =>
      props.active ? theme.color.primary : theme.color.disabled};
    @media (min-width: 480px) {
      font-size: 1rem;
    }
  }

  > hr {
    background: ${theme.color.primary};
    height: 1.5px;
    border: none;
    display: ${(props) => (props.active ? 'block' : 'none')};
  }

  @media (min-width: 480px) {
    padding: 0.625rem 1.25rem;
    margin: 0 0.625rem;
  }
`;
const ReservationInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
  margin-top: 3%;
  margin-bottom: 23vh;
`;

const ReservationInfoImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const ReservationTopInfo = styled.div`
  display: flex;
`;
const ReservationText = styled.p`
  font-size: 11px;
  font-weight: bold;
  @media (min-width: 480px) {
    font-size: 13px;
  }
`;
const ReservationBottomInfo = styled.div`
  display: flex;
`;
const ReservationInfoText = styled.div`
  margin: 0 1rem;
`;
const ReservationInfoItem = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  height: 3rem;
  align-items: center;
  border-top: 1px solid ${theme.color.gray}; /* 상단에 2px 두께의 검은색 테두리 */
  border-bottom: 1px solid ${theme.color.gray}; /* 하단에 2px 두께의 검은색 테두리 */
  @media (min-width: 480px) {
    height: 4rem;
  }
`;
