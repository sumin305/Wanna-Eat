import { useEffect } from 'react';
import useModalStore from '../../../stores/common/useModalStore';
import BlackOutLayoutStyled from './WEBlackOutLayout';

const WEBlackOutLayout = () => {
  const { close, isModalVisible } = useModalStore();

  return (
    <BlackOutLayoutStyled
      isModalVisible={isModalVisible}
      onClick={close}
    ></BlackOutLayoutStyled>
  );
};

export default WEBlackOutLayout;
