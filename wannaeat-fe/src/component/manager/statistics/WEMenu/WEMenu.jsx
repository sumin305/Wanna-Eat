import {
  ImageWrapperStyled,
  ImageStyled,
  LabelStyled,
  ImageWithLabelStyled,
  NumberOfOrdersStyled,
} from './WEMenu.js';

const WEMenu = ({ images }) => {
  return (
    <ImageWrapperStyled>
      {images.map((image, index) => (
        <ImageWithLabelStyled key={index}>
          <ImageStyled src={image.url} alt={`image-${index}`} />
          <LabelStyled>{image.label}</LabelStyled>
          <NumberOfOrdersStyled>{image.numberOfOrders} 번</NumberOfOrdersStyled>
        </ImageWithLabelStyled>
      ))}
    </ImageWrapperStyled>
  );
};

export default WEMenu;
