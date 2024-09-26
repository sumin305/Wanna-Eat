import React, { useState } from 'react';
import {
  ToggleContainer,
  ToggleText,
  ToggleCircle,
  ToggleCircleText,
  ToggleBackground,
} from './WEToggle';

const WEToggle = ({ isOn, setIsOn }) => {
  // const [isOn, setIsOn] = useState(false);

  const handleClickToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <ToggleContainer onClick={handleClickToggle} isOn={isOn}>
      <ToggleBackground isOn={isOn}>
        <ToggleText isOn={isOn}>{isOn ? '사장님' : '손님'}</ToggleText>
      </ToggleBackground>
      <ToggleCircle isOn={isOn}>
        <ToggleCircleText>{isOn ? '손님' : '사장님'}</ToggleCircleText>
      </ToggleCircle>
    </ToggleContainer>
  );
};

export default WEToggle;
