// Loading.js
import React from 'react';
import styled from '@emotion/styled';
import theme from 'style/common/theme';

const Loading = ({ type = 'default' }) => (
  <LoaderContainer>
    <Spinner type={type} />
    <LoadingText>{getLoadingMessage(type)}</LoadingText>
  </LoaderContainer>
);

export default Loading;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white
  z-index: 1000;
`;

const Spinner = styled.div`
  width: ${(props) => (props.type === 'large' ? '80px' : '50px')};
  height: ${(props) => (props.type === 'large' ? '80px' : '50px')};
  border: 5px solid ${theme.color.primary};
  border-top: 5px solid ${(props) => getSpinnerColor(props.type)};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: ${(props) => (props.type === 'large' ? '1.5rem' : '1.5rem')};
  color: ${theme.color.primary};
  font-weight: bold;
`;

const getSpinnerColor = (type) => {
  switch (type) {
    case 'primary':
      return 'white';
    case 'secondary':
      return 'white';
    case 'success':
      return 'white';
    default:
      return 'white';
  }
};

const getLoadingMessage = (type) => {
  switch (type) {
    case 'login':
      return '로그인 중...';
    case 'secondary':
      return '잠시만 기다려 주세요...';
    case 'success':
      return '데이터를 불러오는 중입니다...';
    default:
      return 'Loading...';
  }
};
