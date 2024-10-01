import styled from '@emotion/styled';
import { ReactComponent as SaveButton } from '../../../../../assets/icons/manager/restaurant/button-save.svg';
import { ReactComponent as CancelButton } from '../../../../../assets/icons/manager/restaurant/button-cancel.svg';
import theme from 'style/common/theme.js';

const GridItemStyled = styled.div`
  position: absolute;
  width: ${(props) => props.gridSize}px;
  height: ${(props) => props.gridSize}px;
  display: flex;
  justify-content: center;
  align-items: center;

  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y}px`};
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  transform: rotate(${(props) => `${props.rotation}deg`});
  overflow: auto;
`;

const ButtonWrapperStyled = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;

  @media (min-width: 480px) {
    justify-self: center;
  }
`;

const SaveButtonStyled = styled(SaveButton)`
  cursor: pointer;
`;

const CancelButtonStyled = styled(CancelButton)`
  margin-left: 0.5rem;
  cursor: pointer;
`;

const GridWrapperStyled = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: ${(props) => props.gridColumns * props.gridSize}px;
  height: ${(props) => props.gridRows * props.gridSize}px;

  cursor: ${(props) => (props.scale > 1 ? 'grab' : 'default')};
  touch-action: none;
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

const GridCanvasModalStyled = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 95%;
    height: 1.375rem;
    padding: 0.24rem;
    display: 'block';
    margin: 6px 0;
    border: 1px solid ${theme.color.disabled};
    border-radius: 0.1875rem;
  }

  input:focus {
    outline: none;
    border: 1px solid transparent;
    border-color: ${theme.color.primary};
    color: ${theme.color.primary};
    ::placeholder {
      color: ${theme.color.primary};
    }
  }

  @media (min-width: 480px) {
    label {
      margin-block: 10px;
    }
    input {
      margin-block: 10px;
    }
  }
`;

export {
  GridItemStyled,
  SaveButtonStyled,
  CancelButtonStyled,
  GridWrapperStyled,
  ZoomableGridWrapperStyled,
  GridBackgroundStyled,
  GridCellStyled,
  ButtonWrapperStyled,
  GridCanvasModalStyled,
};
