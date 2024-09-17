import useModalStore from '../../../stores/common/modal/useModalStore';
import BlackOutLayoutStyled from './WEBlackOutLayout';

const WEBlackOutLayout = () => {
  const { close } = useModalStore();
  return <BlackOutLayoutStyled onClick={close}></BlackOutLayoutStyled>;
};

export default WEBlackOutLayout;
