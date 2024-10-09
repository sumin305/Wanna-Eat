// Loading.js
import React from 'react';
import styled from '@emotion/styled';

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
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

const Spinner = styled.div`
  width: ${(props) => (props.type === 'large' ? '80px' : '50px')};
  height: ${(props) => (props.type === 'large' ? '80px' : '50px')};
  border: 5px solid #f3f3f3;
  border-top: 5px solid ${(props) => getSpinnerColor(props.type)};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: ${(props) => (props.type === 'large' ? '1.5rem' : '1.2rem')};
  color: #333;
`;

const getSpinnerColor = (type) => {
  switch (type) {
    case 'primary':
      return '#3498db';
    case 'secondary':
      return '#e74c3c';
    case 'success':
      return '#2ecc71';
    default:
      return '#3498db';
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
