import useModalStore from 'stores/common/useModalStore';

const useAlert = () => {
  const { setModalType, setAlertText, open } = useModalStore();

  const showAlert = (text) => {
    setModalType('alert');
    setAlertText(text);
    open();
  };

  return showAlert;
};

export default useAlert;
