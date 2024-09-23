import { React, useEffect } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { paletteItems } from './ItemPalette';
import { paletteStyles } from './ItemPalette';

const ItemPalette = () => {
  return (
    <div style={paletteStyles.itemPalette}>
      {paletteItems.map((item) => (
        <PaletteItem key={item.id} item={item} />
      ))}
    </div>
  );
};

const PaletteItem = ({ item }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'ITEM',
      item: { id: item.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={drag}
      onTouchStart={(e) => e.stopPropagation()}
      style={{
        ...paletteStyles.paletteItem,
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none',
      }}
    >
      <item.icon style={paletteStyles.paletteItemIcon} />
    </div>
  );
};

export default ItemPalette;
