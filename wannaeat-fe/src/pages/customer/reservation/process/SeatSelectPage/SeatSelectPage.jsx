import WEStep from '../../../../../component/customer/reservation/WEStep/WEStep.jsx';
import { ButtonWrapper } from '../TimeSelectPage/TimeSelectPage';
import theme from '../../../../../style/common/theme';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx';
import { SeatSelectPageContainer } from './SeatSelectPage.js';

import SeatSelect from 'component/customer/reservation/SeatSelect/SeatSelect.jsx';

const SeatSelectPage = (tableData) => {
  const navigate = useNavigate();

  const handleBeforeButtonClick = () => {
    navigate(-1);
  };
  const handleNextButtonClick = () => {
    navigate('/customer/reservation/deposit-payment');
  };
  return (
    <SeatSelectPageContainer>
      <WEStep index={1} />
      <SeatSelect tableData={tableData} />
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
