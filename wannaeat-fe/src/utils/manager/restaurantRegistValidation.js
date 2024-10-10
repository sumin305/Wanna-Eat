const validateName = (name) => {
  if (name.length > 10) {
    return { isValid: false, type: 'long', message: '이름이 너무 깁니다.' };
  } else if (/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/.test(name)) {
    return {
      isValid: false,
      type: 'invalid',
      message: '특수문자는 사용할 수 없습니다.',
    };
  }
  return { isValid: true };
};

export default validateName;
