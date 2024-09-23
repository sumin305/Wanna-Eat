import styled from '@emotion/styled';

export const GridItemStyled = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SaveButtonStyled = styled.button`
  position: fixed;
  bottom: 20px;
  right: 100px;
`;

export const CancelButtonStyled = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const GridWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: ${(props) => props.gridColumns * props.gridSize}px;
  height: ${(props) => props.gridRows * props.gridSize}px;
  cursor: grab;
`;

export const ZoomableGridWrapperStyled = styled.div`
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

export const GridBackgroundStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridColumns}, ${(props) => props.gridSize}px);
  grid-template-rows: repeat(${(props) => props.gridRows}, ${(props) => props.gridSize}px);
  background-color: transparent;
  background-image: linear-gradient(to right, #FF6528 1px, transparent 1px),linear-gradient(to left, #FF6528 1px, transparent 1px),
    linear-gradient(to bottom, #FF6528 1px, transparent 1px), linear-gradient(to top, #FF6528 1px, transparent 1px);
  background-size: ${(props) => props.gridSize}px ${(props) => props.gridSize}px;
  width: ${(props) => props.gridColumns * props.gridSize}px;
  height: ${(props) => props.gridRows * props.gridSize}px;
  position: relative;
  overflow: hidden;
`;

export const GridCellStyled = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
`;
