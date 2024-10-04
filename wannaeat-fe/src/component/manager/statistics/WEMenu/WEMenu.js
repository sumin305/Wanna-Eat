import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const ImageWrapperStyled = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImageWithLabelStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageStyled = styled.img`
  width: 50px;
  height: 50px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: 480px) {
    width: 80px;
    height: 80px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    object-fit: cover;
  }
`;

const LabelStyled = styled.div`
  max-width: 50px;
  display: inline-block;
  font-size: ${theme.fontSize.px9};
  font-weight: ${theme.fontWeight.default};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 10px;

  @media (min-width: 480px) {
    max-width: 80px;
    display: inline-block;
    font-size: ${theme.fontSize.px13};
    font-weight: ${theme.fontWeight.default};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 10px;
  }
`;

const NumberOfOrdersStyled = styled.div`
  max-width: 50px;
  display: inline-block;
  font-size: ${theme.fontSize.px8};
  font-weight: ${theme.fontWeight.default};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 5px;

  @media (min-width: 480px) {
    max-width: 80px;
    display: inline-block;
    font-size: ${theme.fontSize.px11};
    font-weight: ${theme.fontWeight.default};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 10px;
  }
`;

export {
  ImageWrapperStyled,
  ImageStyled,
  LabelStyled,
  ImageWithLabelStyled,
  NumberOfOrdersStyled,
};
