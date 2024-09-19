import React, { useState } from 'react';
import { ToggleContainer, ToggleCircle, ToggleBackground } from './WEToggle';

const WEToggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClickToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <ToggleContainer onClick={handleClickToggle} isOn={isOn}>
      <ToggleBackground isOn={isOn} />
      <ToggleCircle isOn={isOn} />
    </ToggleContainer>
  );
};

export default WEToggle;
