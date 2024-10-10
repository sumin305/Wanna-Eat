import { useEffect } from 'react';
import WEStep from '../../../../../component/customer/reservation/WEStep/WEStep.jsx';
import { ButtonWrapper } from '../TimeSelectPage/TimeSelectPage';
import theme from '../../../../../style/common/theme';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx';
import { SeatSelectPageContainer, MemberCountSyled } from './SeatSelectPage.js';

import SeatSelect from 'component/customer/reservation/SeatSelect/SeatSelect.jsx';
import useReservationStore from 'stores/customer/useReservationStore.js';
import useModalStore from 'stores/common/useModalStore.js';
import useAlert from '../../../../../utils/alert.js';

const SeatSelectPage = (tableData) => {
  const showAlert = useAlert();
  const { maxCapacity, memberCount, setMaxCapacity, setTableList } =
    useReservationStore();

  const { close, setHandleButtonClick } = useModalStore();

  const navigate = useNavigate();

  const handleBeforeButtonClick = () => {
    setHandleButtonClick(close);
    setMaxCapacity(0);
    setTableList([]);
    navigate(-1);
  };
  const handleNextButtonClick = () => {
    if (maxCapacity < memberCount) {
      showAlert('방문 인원에 맞춰 테이블을 선택해 주세요.');
    } else {
      navigate('/customer/reservation/deposit-payment');
    }
  };

  useEffect(() => {
    setHandleButtonClick(close);
    setMaxCapacity(0);
    setTableList([]);
  }, []);

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
