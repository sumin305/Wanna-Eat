import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

import { ReactComponent as SquareTableIcon } from 'assets/icons/manager/restaurant/table-square.svg';
import { ReactComponent as RoundTableIcon } from 'assets/icons/manager/restaurant/table-rounded.svg';
import { ReactComponent as SquareTablePointedIcon } from 'assets/icons/manager/restaurant/table-square-pointed.svg';
import { ReactComponent as RoundTablePointedIcon } from 'assets/icons/manager/restaurant/table-rounded-pointed.svg';
import { ReactComponent as RestroomIcon } from 'assets/icons/manager/restaurant/restroom.svg';
import { ReactComponent as CounterIcon } from 'assets/icons/manager/restaurant/cashier.svg';
import { ReactComponent as EntranceIcon } from 'assets/icons/manager/restaurant/door.svg';
import { ReactComponent as KitchenIcon } from 'assets/icons/manager/restaurant/kitchen.svg';

const Items = [
  {
    itemType: 'SQUARE',
    label: '사각 테이블',
    icon: SquareTableIcon,
  },
  {
    itemType: 'ROUNDED',
    label: '원형 테이블',
    icon: RoundTableIcon,
  },
  {
    itemType: 'RESTROOM',
    label: '화장실',
    icon: RestroomIcon,
  },
  {
    itemType: 'COUNTER',
    label: '계산대',
    icon: CounterIcon,
  },
  {
    itemType: 'ENTRANCE',
    label: '출입구',
    icon: EntranceIcon,
  },
  {
    itemType: 'KITCHEN',
    label: '주방',
    icon: KitchenIcon,
  },
];

const SeatingMapStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 60vh;
  height: 60vh;
`;

const MapStyled = styled.div`
  position: relative;
  width: 75%;
  height: 100%;
  max-width: 480px;
  border: 1px solid ${theme.color.primary};

  @media (min-width: 480px) {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 480px;
    border: 1px solid ${theme.color.primary};
  }
`;

const ItemWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${({ x }) => (x / 500) * 100}%;
  top: ${({ y }) => (y / 500) * 100}%;
  width: 15%;
  height: 15%;
  /* background-color: blue; */
`;

const LabelStyled = styled.div`
  font-size: ${theme.fontSize.px13};
  font-weight: ${theme.fontWeight.default};
`;

export { Items, SeatingMapStyled, MapStyled, ItemWrapperStyled, LabelStyled };
