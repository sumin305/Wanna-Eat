import styled from '@emotion/styled';

<<<<<<< HEAD
export const GridBackground = styled.div`
  background-size: 5vw 2vh;
  aspect-ratio: 1 / 1;
  background-image: linear-gradient(to right, lightgray 1px, transparent 1px),
    linear-gradient(to bottom, lightgray 1px, transparent 1px);
  display: grid;
  grid-template-columns: repeat(${({ gridColumns }) => gridColumns}, 50px);
  grid-template-rows: repeat(${({ gridColumns }) => gridColumns}, 50px);
  gap: 2px;
  position: relative;
  /* width: ${({ gridColumns }) => gridColumns * 50}px;
  height: ${({ gridColumns }) => gridColumns * 50}px; */

  @media (max-width: 480px) {
    grid-template-columns: repeat(${({ gridColumns }) => gridColumns}, 25px);
    grid-template-rows: repeat(${({ gridColumns }) => gridColumns}, 25px);
    width: ${({ gridColumns }) => gridColumns * 25}px;
    height: ${({ gridColumns }) => gridColumns * 25}px;
  }
`;

export const GridItem = styled.div`
=======
export const GridItemStyled = styled.div`
>>>>>>> d73aaa4191a3cc6ab42e82e09cf517d70d015aa5
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
