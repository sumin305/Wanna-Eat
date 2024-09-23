import styled from '@emotion/styled';

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
  position: absolute;
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
  width: 50px;
  height: 50px;

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
  }
`;
