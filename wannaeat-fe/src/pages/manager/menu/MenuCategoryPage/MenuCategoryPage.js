import styled from '@emotion/styled';

// FormContainer 스타일에 맞춘 카테고리 모달 컨테이너
export const CategoryModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// CategoryList는 flex 대신 컬럼 구조를 사용
export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// CategoryItem은 InputField 스타일을 반영
export const CategoryItem = styled.li`
  font-size: 18px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// IconButton 스타일 추가
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

// CloseButton은 SubmitButton 스타일을 반영
export const CloseButton = styled.button`
  background-color: #ff4500;
  color: white;
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  display: block;
  text-align: center;

  &:hover {
    background-color: #e63900;
  }
`;

// Category 추가 버튼 스타일
export const AddCategoryButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

// 새로운 카테고리 입력창 스타일
export const NewCategoryInput = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 70%; /* 입력창 너비를 70%로 조정 */
  margin-right: 10px; /* 버튼과의 간격 */
`;

// 완료 버튼 스타일
export const CompleteButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 12px; /* 버튼의 크기를 조정 */
  width: 50px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px; /* 글씨 크기 조정 */

  &:hover {
    background-color: #218838;
  }
`;
