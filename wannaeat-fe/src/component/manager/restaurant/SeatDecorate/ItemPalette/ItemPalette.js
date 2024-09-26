import styled from '@emotion/styled';
import { ReactComponent as SquareTableIcon } from '../../../../../assets/icons/manager/restaurant/table-square.svg';
import { ReactComponent as RoundTableIcon } from '../../../../../assets/icons/manager/restaurant/table-rounded.svg';
import { ReactComponent as RestroomIcon } from '../../../../../assets/icons/manager/restaurant/restroom.svg';
import { ReactComponent as CounterIcon } from '../../../../../assets/icons/manager/restaurant/cashier.svg';
import { ReactComponent as EntranceIcon } from '../../../../../assets/icons/manager/restaurant/door.svg';

import { ReactComponent as ArrowLeftIcon } from '../../../../../assets/icons/manager/restaurant/arrow-left.svg';
import { ReactComponent as ArrowRIghtIcon } from '../../../../../assets/icons/manager/restaurant/arrow-right.svg';

const paletteItems = [
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

const ItemPaletteStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 9vh;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px;
  background-color: transparent;
  border-bottom: 1px solid #ccc;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  flex-wrap: nowrap;
`;

const PaletteItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  text-align: center;
  width: 50px;
  height: 100%;
  flex: 0 0 auto;
  scroll-snap-align: start;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  touch-action: none;

  @media (min-width: 480px) {
    width: 80px;
    height: 100%;
  }
`;

const PaletteItemIconStyled = styled.div`
  width: 40px;
  height: 40px;
  cursor: grab;
  svg {
    width: 80%;
    height: 80%;
  }

  @media (min-width: 480px) {
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const PaletteItemLabelStyled = styled.div`
  font-size: 0.55rem;
  user-select: none;

  @media (min-width: 480px) {
    font-size: 0.8rem;
    margin-top: 5px;
  }
`;

const ArrowLeftIconStyled = styled(ArrowLeftIcon)`
  position: absolute;
  left: 0;
  visibility: hidden; // 임시로 제거
`;
const ArrowRightIconStyled = styled(ArrowRIghtIcon)`
  position: absolute;
  right: 0;
  visibility: hidden; // 임시로 제거
`;

export {
  paletteItems,
  ItemPaletteStyled,
  PaletteItemStyled,
  PaletteItemIconStyled,
  PaletteItemLabelStyled,
  ArrowLeftIconStyled,
  ArrowRightIconStyled,
};
