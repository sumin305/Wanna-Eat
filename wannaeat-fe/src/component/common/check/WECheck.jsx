import React from 'react';
import { CheckContainer, CheckImg } from './WECheck';
import CheckPrimary from '../../../assets/icons/common/check-primary.svg';
import CheckWhite from '../../../assets/icons/common/check-white.svg';

const WECheck = ({ isChecked }) => {
  return (
    <div>
      <CheckContainer isChecked={isChecked}>
        <CheckImg src={CheckWhite} alt="하얀색 체크" />
      </CheckContainer>
    </div>
  );
};

export default WECheck;
