import React from 'react';
import {Rect} from 'react-konva';

const Rectangle = ({x, y, onSelect, isSelect, id}) => {
  // console.log(+isSelect, +id);
  isSelect = +isSelect === +id;
  return (
    <Rect 
      width={100}
      height={100}
      x={x}
      y={y}
      fill={isSelect ? 'green':'black'}
      stroke="blue"
      strokeWidth={1}
      onClick={onSelect}
      onTap={onSelect}
    />
  )
}

export default Rectangle;