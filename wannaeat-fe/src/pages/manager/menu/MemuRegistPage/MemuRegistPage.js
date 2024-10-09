import styled from '@emotion/styled';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const InputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const InputField = styled.input`
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  margin-top: 10px;
  border-radius: 5px;
  width: 100%;
  height: 80px;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

export const UploadButton = styled.button`
  width: 50px;
  height: 50px;
  color: #ff4500;
  background: none;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

export const CloseButton = styled.button`
  background-color: #ff4500;
  color: white;
  border: none;
  padding: 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  width: 48%;
  margin-top: 20px;

  &:hover {
    background-color: #e63900;
  }
`;

export const SubmitButton = styled.button`
  background-color: #ff4500;
  color: white;
  border: none;
  padding: 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  width: 48%;
  margin-top: 20px;

  &:hover {
    background-color: #e63900;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.div`
  display: inline-block;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;

  &.highlight {
    animation: highlightAnimation 0.8s ease forwards; // 애니메이션 추가
  }

  @keyframes highlightAnimation {
    0% {
      transform: scale(1);
      box-shadow: 0px 0px 0px rgba(255, 165, 0, 0);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0px 0px 20px rgba(255, 165, 0, 0.6);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      box-shadow: 0px 0px 0px rgba(255, 165, 0, 0);
      opacity: 0.9;
    }
  }
`;


export const DecorateButton = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  padding: 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  width: 48%;
  margin-top: 20px;

  &:hover {
    background-color: #ff8c00;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
