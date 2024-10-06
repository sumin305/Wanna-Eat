import styled from '@emotion/styled';

import { ReactComponent as SquareTableIcon } from 'assets/icons/manager/restaurant/table-square.svg';
import { ReactComponent as RoundTableIcon } from 'assets/icons/manager/restaurant/table-rounded.svg';
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
  width: 100%;
  height: 100%;
`;

export { Items, SeatingMapStyled };
