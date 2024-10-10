import {
  ImageWrapperStyled,
  ImageStyled,
  LabelStyled,
  ImageWithLabelStyled,
  NumberOfOrdersStyled,
} from './WEMenu.js';

import defaultMenuImg from 'assets/icons/menu/basic-menu.svg';

const WEMenu = ({ images }) => {
  return (
    <ImageWrapperStyled>
      {images.map((image, index) => (
        <ImageWithLabelStyled key={index}>
          <ImageStyled
            src={image.url || defaultMenuImg}
            alt={`image-${index}`}
          />
          <LabelStyled>{image.label}</LabelStyled>
          <NumberOfOrdersStyled>{image.numberOfOrders} 번</NumberOfOrdersStyled>
        </ImageWithLabelStyled>
      ))}
    </ImageWrapperStyled>
  );
};

export default WEMenu;
