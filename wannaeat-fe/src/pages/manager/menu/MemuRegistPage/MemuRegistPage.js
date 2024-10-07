import styled from '@emotion/styled';

// FormContainer 스타일 정의
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
  gap: 20px;  // 버튼 간의 간격을 추가
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
  width: 48%;  // 버튼 너비를 줄여서 간격 조정
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
  width: 48%;  // 버튼 너비를 줄여서 간격 조정
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

// 가격 인풋 필드 크기 조정
export const PriceInput = styled(InputField)`
  width: 180px;  // 가격 인풋 크기를 줄임
`;


// 꾸미기 버튼 스타일 추가
export const DecorateButton = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  padding: 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  width: 48%;  // 버튼 너비를 줄여서 간격 조정
  margin-top: 20px;

  &:hover {
    background-color: #ff8c00;
  }
`;

// 버튼 컨테이너 스타일 추가
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;  // 버튼 간의 간격
  margin-top: 10px;
`;