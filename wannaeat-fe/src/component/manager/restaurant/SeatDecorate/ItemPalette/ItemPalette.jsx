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
    type: 'ITEM',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <PaletteItemStyled
      ref={drag}
      isDragging={isDragging}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <PaletteItemIconStyled>
        <item.icon />
      </PaletteItemIconStyled>
      <PaletteItemLabelStyled>{item.label}</PaletteItemLabelStyled>
    </PaletteItemStyled>
  );
};

export default ItemPalette;
