import { ReactComponent as WarningIcon } from '../../../../assets/warning.svg';
import components from './WETextfield.js';
import useTextfieldStore from '../../../../stores/textfield/useTextfieldStore.js';

const {
  TextfieldWrapperStyled,
  TextfieldStyled,
  ErrorMessageStyled,
  ErrorMessageDivStyled,
} = components;

const Textfield = ({ type = 'text', name, ...props }) => {
  const { errors, errorMessages, clearError } = useTextfieldStore();

  const handleFocus = () => {
    clearError(name);
  };

  const errorType = errors[name];
  const errorMessage = errorMessages[name];

  return (
    <TextfieldWrapperStyled {...props}>
      <TextfieldStyled
        type={type}
        name={name}
        error={!!errorType}
        onFocus={handleFocus}
        {...props}
      />

      <ErrorMessageDivStyled error={!!errorType}>
        {<WarningIcon />}
        <ErrorMessageStyled>
          {errorMessage || '오류가 발생하였습니다.'}
        </ErrorMessageStyled>
      </ErrorMessageDivStyled>
    </TextfieldWrapperStyled>
  );
};

export default Textfield;
