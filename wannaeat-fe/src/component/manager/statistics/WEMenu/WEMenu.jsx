import {
  ImageWrapperStyled,
  ImageStyled,
  LabelStyled,
  ImageWithLabelStyled,
  NumberOfOrdersStyled,
} from './WEMenu.js';
import testImage1 from 'assets/MochaLong1.webp';
import testImage2 from 'assets/MochaShort1.png';
import testImage3 from 'assets/MintLatte1.png';

const WEMenu = () => {
  const images = [
    {
      url: testImage1,
      label: '아이스카페모카',
      numberOfOrders: '123456789',
    },
    {
      url: testImage2,
      label: 'CafeMocha',
      numberOfOrders: '12345',
    },
    {
      url: testImage3,
      label: 'Mint Latte',
      numberOfOrders: '12345',
    },
  ];
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
