import TextfieldStyled from "./WETextfield.js";
import ErrorMessageStyled from "./WEErrorMessage.js";

const Textfield = ({type="text", error, errorMessage, ...props}) => {
    return (
        <div>
            <TextfieldStyled type={type} error={error} {...props} />
            {error && <ErrorMessageStyled>{errorMessage}</ErrorMessageStyled>}
        </div>
    );
};

export default Textfield;