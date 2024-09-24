import { ReactComponent as SquareTableIcon } from '../../../../../assets/icons/manager/restaurant/table-square.svg';
import { ReactComponent as RoundTableIcon } from '../../../../../assets/icons/manager/restaurant/table-rounded.svg';
import { ReactComponent as RestroomIcon } from '../../../../../assets/icons/manager/restaurant/restroom.svg';
import { ReactComponent as CounterIcon } from '../../../../../assets/icons/manager/restaurant/cashier.svg';
import { ReactComponent as EntranceIcon } from '../../../../../assets/icons/manager/restaurant/door.svg';

export const paletteItems = [
  {
    id: 1,
    label: '사각 테이블',
    icon: SquareTableIcon,
  },
  {
    id: 2,
    label: '원형 테이블',
    icon: RoundTableIcon,
  },
  {
    id: 3,
    label: '화장실',
    icon: RestroomIcon,
  },
  {
    id: 4,
    label: '계산대',
    icon: CounterIcon,
  },
  {
    id: 5,
    label: '출입구',
    icon: EntranceIcon,
  },
];

export const paletteStyles = {
  itemPalette: {
    display: 'flex',
    overflowX: 'scroll',
    padding: '10px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid #ccc',
    scrollSnapType: 'x mandatory',
  },
  paletteItem: {
    cursor: 'grab',
    padding: '5px',
    textAlign: 'center',
    width: '60px',
    height: '60px',
    flex: '0 0 auto',
    scrollSnapAlign: 'start',
  },
  paletteItemIcon: {
    width: '40px',
    height: '40px',
  },
};
