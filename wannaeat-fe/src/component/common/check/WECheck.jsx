import React from 'react';
import { CheckContainer, CheckImg } from './WECheck';
import CheckPrimary from '../../../assets/icons/common/check-primary.svg';
import CheckWhite from '../../../assets/icons/common/check-white.svg';

const WECheck = ({ type }) => {
  return (
    <CheckContainer type={type}>
      {type === 'checkClickCarrot' && (
        <CheckImg src={CheckWhite} alt="하얀색 체크" />
      )}
      {type === 'checkClickWhite' && (
        <CheckImg src={CheckPrimary} alt="주황색 체크" />
      )}
    </CheckContainer>
  );
};

export default WECheck;
