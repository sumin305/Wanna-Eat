import { ReactComponent as WarningIcon } from '../../../../assets/warning.svg';
import components from './WETextfield.js';
const { TextfieldStyled, ErrorMessageStyled, ErrorMessageDivStyled } =
  components;

const Textfield = ({
  type = 'text',
  error = false,
  errorMessage = '',
  ...props
}) => {
  return (
    <div>
      <TextfieldStyled
        type={type}
        error={error}
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
