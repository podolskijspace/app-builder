import React from 'react';
import {Rect, Text} from 'react-konva';

const Rectangle = ({x, y, onSelect, isSelect, id}) => {
  isSelect = !!~isSelect.indexOf(id);

  return (
    <>
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
      <Rect 
        width={85}
        height={30}
        x={x}
        y={y}
        fill='red'
      />
      <Text 
        text={`width: ${100}`}
        x={x}
        y={y}
      />
      <Text 
        text={`height: ${100}`}
        x={x}
        y={y + 10}
      />
      <Text 
        text={`inSelected: ${isSelect ? 'yes' : 'no'}`}
        x={x}
        y={y + 20}
      />
    </>
  )
}

export default Rectangle;