import React from 'react';
import { useDrag } from 'react-dnd';
import { paletteItems } from './ItemPalette.js';
import {
  ItemPaletteStyled,
  PaletteItemStyled,
  PaletteItemIconStyled,
  PaletteItemLabelStyled,
} from './ItemPalette.js';

const ItemPalette = () => {
  return (
    <ItemPaletteStyled>
      {paletteItems.map((item) => (
        <PaletteItem key={item.id} item={item} />
      ))}
    </ItemPaletteStyled>
  );
};

const PaletteItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PALETTE_ITEM',
    item: { id: item.id, type: 'PALETTE_ITEM' },
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
