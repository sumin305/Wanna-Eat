import { ReactComponent as WarningIcon } from '../../../../assets/icons/common/warning.svg';
import components from './WETextfield.js';
import useTextfieldStore from '../../../../stores/common/textfield/useTextfieldStore.js';

const {
  TextfieldWrapperStyled,
  TextfieldStyled,
  ErrorMessageStyled,
  ErrorMessageDivStyled,
} = components;

const Textfield = ({
  placeholder = '',
  value,
  type = 'text',
  name,
  ...props
}) => {
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
        value={value}
        error={!!errorType}
        onFocus={handleFocus}
        placeholder={placeholder}
        {...props}
      />

      {errorType && (
        <ErrorMessageDivStyled error={!!errorType}>
          {<WarningIcon />}
          <ErrorMessageStyled>
            {errorMessage || '오류가 발생하였습니다.'}
          </ErrorMessageStyled>
        </ErrorMessageDivStyled>
      )}
    </TextfieldWrapperStyled>
  );
};

export default Textfield;
