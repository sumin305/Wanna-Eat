import useModalStore from 'stores/common/useModalStore';

const useAlert = () => {
  const {
    close,
    setHandleButtonClick,
    setIsOneButton,
    setModalType,
    setAlertText,
    open,
  } = useModalStore();

  const showAlert = (text, callback) => {
    setModalType('alert');
    setAlertText(text);
    setHandleButtonClick(() => {
      close();
      if (callback) callback();
    });
    setIsOneButton(true);
    open();
  };

  return showAlert;
};

export default useAlert;
