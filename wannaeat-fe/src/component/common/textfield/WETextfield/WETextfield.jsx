import { ReactComponent as WarningIcon } from '../../../../assets/warning.svg';
import components from './WETextfield.js';
import useTextfieldStore from '../../../../stores/common/textfield/useTextfieldStore';

const { TextfieldStyled, ErrorMessageStyled, ErrorMessageDivStyled } =
  components;

const Textfield = ({
  type = 'text',
  error = false,
  errorMessage = '',
  ...props
}) => {
  const { error, setError, clearError } = useTextfieldStore();

  const handleFocus = () => {
    if (error) clearError();
  };

  return (
    <div>
      <TextfieldStyled
        type={type}
        error={error}
        onFocus={handleFocus}
        errorMessage={errorMessage}
        {...props}
      />
      {error && (
        <ErrorMessageDivStyled>
          {<WarningIcon />}
          {<ErrorMessageStyled>{errorMessage}</ErrorMessageStyled>}
        </ErrorMessageDivStyled>
      )}
    </div>
  );
};

export default Textfield;
