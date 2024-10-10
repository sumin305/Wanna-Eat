import useModalStore from 'stores/common/useModalStore';

const useAlert = () => {
  const {
    close,
    setHandleButtonClick,
    setIsOneButton,
    setModalType,
    setAlertText,
    open,
    setConfirmText,
  } = useModalStore();

  const showAlert = (text) => {
    setModalType('alert');
    setConfirmText('확인');
    setAlertText(text);
    setHandleButtonClick(close);
    setIsOneButton(true);
    open();
  };

  return showAlert;
};

export default useAlert;
