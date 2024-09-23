import styled from '@emotion/styled';
import { ReactComponent as SaveButton } from '../../../../../assets/icons/manager/restaurant/button-save.svg';
import { ReactComponent as CancelButton } from '../../../../../assets/icons/manager/restaurant/button-cancel.svg';

const GridItemStyled = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SaveButtonStyled = styled(SaveButton)`
  position: fixed;
  bottom: 10vh;
  right: 1vh;

  @media (min-width: 480px) {
    justify-self: center;
    bottom: 85px;
    right: 480px;
  }

  cursor: pointer;
`;

const CancelButtonStyled = styled(CancelButton)`
  position: fixed;
  bottom: 10vh;
  right: 15vw;

  @media (min-width: 480px) {
    justify-self: center;
    bottom: 85px;
    right: 36vw;
  }

  cursor: pointer;
`;

const GridWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: ${(props) => props.gridColumns * props.gridSize}px;
  height: ${(props) => props.gridRows * props.gridSize}px;
  cursor: grab;
`;

const ZoomableGridWrapperStyled = styled.div`
  width: ${(props) => props.gridColumns * props.gridSize}px;
  height: ${(props) => props.gridRows * props.gridSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  transform: scale(${(props) => props.scale});
  transform-origin: top left;
  touch-action: none;
`;

const GridBackgroundStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.gridColumns},
    ${(props) => props.gridSize}px
  );
  grid-template-rows: repeat(
    ${(props) => props.gridRows},
    ${(props) => props.gridSize}px
  );
  background-color: transparent;
  background-image: linear-gradient(to right, #ff6528 1px, transparent 1px),
    linear-gradient(to left, #ff6528 1px, transparent 1px),
    linear-gradient(to bottom, #ff6528 1px, transparent 1px),
    linear-gradient(to top, #ff6528 1px, transparent 1px);
  background-size: ${(props) => props.gridSize}px ${(props) => props.gridSize}px;
  width: ${(props) => props.gridColumns * props.gridSize}px;
  height: ${(props) => props.gridRows * props.gridSize}px;
  position: relative;
  overflow: hidden;
`;

const GridCellStyled = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
`;

export {
  GridItemStyled,
  SaveButtonStyled,
  CancelButtonStyled,
  GridWrapperStyled,
  ZoomableGridWrapperStyled,
  GridBackgroundStyled,
  GridCellStyled,
};
