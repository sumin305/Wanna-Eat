import { useEffect } from 'react';
import {
  PeakTimePageStyled,
  PeaKTimePageWrapper,
  PeakTimeHeaderStyled,
  DateStyled,
  DayWrapperStyled,
  TurnoverWrapperStyled,
  TurnoverStyled,
} from './PeakTimePage.js';

import useHeaderStore from 'stores/common/useHeaderStore.js';

import WEColumn from 'component/manager/statistics/WEColumn/WEColumn.jsx';

import { ReactComponent as LeftArrow } from 'assets/icons/manager/statistics/arrow-left-carrot.svg';
import { ReactComponent as RightArrow } from 'assets/icons/manager/statistics/arrow-right-carrot.svg';

const PeakTimePage = () => {
  const {
    setIsCarrot,
    setIsShowBackIcon,
    setActiveIcons,
    setPageName,
    setIsUnderLine,
  } = useHeaderStore();

  useEffect(() => {
    setIsCarrot(false);
    setIsShowBackIcon(true);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setPageName('피크타임 상세보기');
  }, [
    setIsCarrot,
    setIsShowBackIcon,
    setActiveIcons,
    setPageName,
    setIsUnderLine,
  ]);

  const categories = ['월', '화', '수', '목', '금', '토', '일'];
  const series = [
    {
      name: '예약 건수',
      data: [100, 200, 180, 150, 500, 300, 450],
    },
  ];

  return (
    <PeakTimePageStyled>
      <PeaKTimePageWrapper>
        <PeakTimeHeaderStyled>
          <LeftArrow className="arrow" />
          <DateStyled> 2024.09 </DateStyled>
          <RightArrow className="arrow" />
        </PeakTimeHeaderStyled>
        <DayWrapperStyled>
          <div>요일</div>
          <WEColumn categories={categories} series={series} />
        </DayWrapperStyled>
        <TurnoverWrapperStyled>
          <TurnoverStyled>회전율: 1.5회</TurnoverStyled>
          <TurnoverStyled>평균 이용 시간: 1.5시간</TurnoverStyled>
        </TurnoverWrapperStyled>
        <div>
          <div>시간</div>
          <WEColumn categories={categories} series={series} />
        </div>
      </PeaKTimePageWrapper>
    </PeakTimePageStyled>
  );
};

export default PeakTimePage;
