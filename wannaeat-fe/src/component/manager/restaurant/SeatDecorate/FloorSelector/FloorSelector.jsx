import {
  FloorSelectorStyled,
  FloorSelectorButtonStyled,
} from './FloorSelector.js';

const FloorSelector = ({ floors, currentFloor, onFloorChange }) => {
  return (
    <FloorSelectorStyled>
      {floors.map((floor) => (
        <FloorSelectorButtonStyled
          key={floor}
          onClick={() => onFloorChange(floor)}
          isActive={currentFloor === floor}
        >
          {floor}층
        </FloorSelectorButtonStyled>
      ))}
    </FloorSelectorStyled>
  );
};

export default FloorSelector;
