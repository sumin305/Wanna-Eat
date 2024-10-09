import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

import { ReactComponent as SquareTableIcon } from 'assets/icons/manager/restaurant/table-square-disabled.svg';
import { ReactComponent as RoundTableIcon } from 'assets/icons/manager/restaurant/table-rounded-disabled.svg';
import { ReactComponent as RestroomIcon } from 'assets/icons/manager/restaurant/restroom.svg';
import { ReactComponent as CounterIcon } from 'assets/icons/manager/restaurant/cashier.svg';
import { ReactComponent as EntranceIcon } from 'assets/icons/manager/restaurant/door.svg';
import { ReactComponent as KitchenIcon } from 'assets/icons/manager/restaurant/kitchen.svg';

const Items = [
  {
    itemType: 'square',
    label: '사각 테이블',
    icon: SquareTableIcon,
  },
  {
    itemType: 'rounded',
    label: '원형 테이블',
    icon: RoundTableIcon,
  },
  {
    itemType: 'restroom',
    label: '화장실',
    icon: RestroomIcon,
  },
  {
    itemType: 'counter',
    label: '계산대',
    icon: CounterIcon,
  },
  {
    itemType: 'entrance',
    label: '출입구',
    icon: EntranceIcon,
  },
  {
    itemType: 'kitchen',
    label: '주방',
    icon: KitchenIcon,
  },
];

const SeatingMapStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 58vh;
  height: 58vh;
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
  left: ${({ x }) => (x / 480) * 100}%;
  top: ${({ y }) => (y / 480) * 100}%;
  width: ${({ svgWidth }) => svgWidth}%;
  height: ${({ svgHeight }) => svgHeight}%;
  /* width: 23%;
  height: 23%; */

  /* background-color: blue; */

  svg {
    width: 100%;
    height: 100%;
  }
`;

const LabelStyled = styled.div`
  font-size: ${theme.fontSize.px13};
  font-weight: ${theme.fontWeight.default};
`;

export { Items, SeatingMapStyled, MapStyled, ItemWrapperStyled, LabelStyled };
