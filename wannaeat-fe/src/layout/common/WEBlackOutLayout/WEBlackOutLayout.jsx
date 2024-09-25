import { useEffect } from 'react';
import useModalStore from '../../../stores/common/modal/useModalStore';
import BlackOutLayoutStyled from './WEBlackOutLayout';

const WEBlackOutLayout = () => {
  const { close, isModalVisible } = useModalStore();

  useEffect(() => {
    console.log('모달창 렌더링!');
  });
  return (
    <BlackOutLayoutStyled
      isModalVisible={isModalVisible}
      onClick={close}
    ></BlackOutLayoutStyled>
  );
};

export default WEBlackOutLayout;
