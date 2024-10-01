import { FloorSelectorStyled } from './FloorSelector.js';

const FloorSelector = ({ floors, currentFloor, onFloorChange }) => {
  return (
    <FloorSelectorStyled>
      {floors.map((floor) => (
        <button
          key={floor}
          onClick={() => onFloorChange(floor)}
          style={{
            backgroundColor: currentFloor === floor ? '#ff6528' : '#f0f0f0',
            color: currentFloor === floor ? '#fff' : '#000',
          }}
        >
          {floor}층
        </button>
      ))}
    </FloorSelectorStyled>
  );
};

export default FloorSelector;
