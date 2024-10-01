import { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { paletteItems } from './ItemPalette.js';
import {
  ItemPaletteContainerStyled,
  ItemPaletteStyled,
  PaletteItemStyled,
  PaletteItemIconStyled,
  PaletteItemLabelStyled,
  ArrowLeftIconStyled,
  ArrowRightIconStyled,
} from './ItemPalette.js';

const ItemPalette = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
  };

  return (
    <ItemPaletteContainerStyled>
      <ArrowLeftIconStyled onClick={scrollLeft} disabled={!canScrollLeft} />
      <ItemPaletteStyled ref={scrollRef} onScroll={handleScroll}>
        {paletteItems.map((item) => (
          <PaletteItem key={item.itemId} item={item} />
        ))}
      </ItemPaletteStyled>
      <ArrowRightIconStyled onClick={scrollRight} disabled={!canScrollRight} />
    </ItemPaletteContainerStyled>
  );
};

const PaletteItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PALETTE_ITEM',
    item: { itemId: item.itemId, type: 'PALETTE_ITEM' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <PaletteItemStyled
      isDragging={isDragging}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <PaletteItemIconStyled ref={drag}>
        <item.icon />
      </PaletteItemIconStyled>
      <PaletteItemLabelStyled>{item.label}</PaletteItemLabelStyled>
    </PaletteItemStyled>
  );
};

export default ItemPalette;
