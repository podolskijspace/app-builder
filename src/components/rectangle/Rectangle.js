import React, {useEffect} from 'react';
import {Rect, Text, Transformer} from 'react-konva';

const Rectangle = ({x, y, onSelect, isSelect, id, onChange, shapeProps}) => {
  isSelect = !!~isSelect.indexOf(id);

  const shapeRef = React.useRef();
  const trRef = React.useRef();

  useEffect(() => {
    if (isSelect) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelect]);

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
        {...shapeProps}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelect && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      {/* <Rect 
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
      /> */}
    </>
  )
}

export default Rectangle;