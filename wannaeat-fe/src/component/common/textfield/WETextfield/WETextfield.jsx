import { ReactComponent as WarningIcon } from '../../../../assets/warning.svg';
import components from './WETextfield.js';
import useTextfieldStore from '../../../../stores/textfield/useTextfieldStore.js';

const { TextfieldStyled, ErrorMessageStyled, ErrorMessageDivStyled } =
  components;

const Textfield = ({ type = 'text', fieldName, ...props }) => {
  const { errors, errorMessages, clearError } = useTextfieldStore();

  const handleFocus = () => {
    clearError(fieldName);
  };

  const isError = errors[fieldName];
  const errorMessage = errorMessages[fieldName];

  return (
    <div>
      <TextfieldStyled
        type={type}
        error={isError}
        onFocus={handleFocus}
        {...props}
      />
      {isError && (
        <ErrorMessageDivStyled>
          {<WarningIcon />}
          <ErrorMessageStyled>
            {errorMessage || '오류가 발생하였습니다.'}
          </ErrorMessageStyled>
        </ErrorMessageDivStyled>
      )}
    </div>
  );
};

export default Textfield;
