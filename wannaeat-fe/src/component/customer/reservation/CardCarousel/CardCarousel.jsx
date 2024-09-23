import {CardCarouselStyled} from './CardCarousel'
const CardCarousel = ({img}) => {
    return (
    <CardCarouselStyled>
        <img src={img}/>
    </CardCarouselStyled>)
}

export default CardCarousel;