import React, {useRef} from 'react';
import {Rect, Text, Transformer} from 'react-konva';

const Rectangle = ({shapeProps, onSelect, isSelect, id, onChange}) => {
  const trRef = useRef();
  const shapeRef = React.useRef();

  isSelect = !!~isSelect.indexOf(id);

  React.useEffect(() => {
    if (isSelect) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, isSelect);


  return (
    <>
      <Rect 
        {...shapeProps}
        fill={isSelect ? 'green':'black'}
        ref={shapeRef}
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
        <>
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
          <Rect 
            width={85}
            height={22}
            x={3 + shapeProps.x}
            y={3 + shapeProps.y}
            fill='red'
          />
          <Text 
            text={`width: ${Math.round(shapeProps.width)}`}
            x={4 + shapeProps.x}
            y={4 + shapeProps.y}
          />
          <Text 
            text={`height: ${Math.round(shapeProps.height)}`}
            x={4 + shapeProps.x}
            y={4 + shapeProps.y + 10}
          />
        </>
      )}
    </>
  )
}

export default Rectangle;