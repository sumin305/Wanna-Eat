import WEStep from '../../../../../component/customer/reservation/WEStep/WEStep.jsx';
import { ButtonWrapper } from '../TimeSelectPage/TimeSelectPage';
import theme from '../../../../../style/common/theme';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx';
import { SeatSelectPageContainer, MemberCountSyled } from './SeatSelectPage.js';

import SeatSelect from 'component/customer/reservation/SeatSelect/SeatSelect.jsx';
import useReservationStore from 'stores/customer/useReservationStore.js';

const SeatSelectPage = (tableData) => {
  const { maxCapacity, memberCount } = useReservationStore();

  const navigate = useNavigate();

  const handleBeforeButtonClick = () => {
    navigate(-1);
  };
  const handleNextButtonClick = () => {
    if (maxCapacity <= memberCount) {
      window.alert('방문 인원에 맞춰 테이블을 선택해 주세요.');
    } else {
      navigate('/customer/reservation/deposit-payment');
    }
  };

  return (
    <SeatSelectPageContainer>
      <WEStep index={1} />
      <SeatSelect tableData={tableData} />
      <MemberCountSyled>
        선택 좌석 수: {maxCapacity} / 인원: {memberCount}
      </MemberCountSyled>
      <ButtonWrapper>
        <Button
          onClick={handleBeforeButtonClick}
          size="short"
          color={'black'}
          backgroundColor={theme.color.disabled}
        >
          이전
        </Button>
        <Button onClick={handleNextButtonClick} size="venti">
          예약
        </Button>
      </ButtonWrapper>
    </SeatSelectPageContainer>
  );
};

export default SeatSelectPage;
