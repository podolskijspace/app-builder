import React, {useRef} from 'react';
import {Rect, Text, Transformer} from 'react-konva';

const Rectangle = ({shapeProps, onSelect, isSelect, id}) => {
  const trRef = useRef();
  const shapeRef = React.useRef();

  isSelect = !!~isSelect.indexOf(id);

  React.useEffect(() => {
    if (isSelect) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelect]);


  return (
    <>
      <Rect 
        {...shapeProps}
        fill={isSelect ? 'green':'black'}
        ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
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
      /> */}
      {/* <Text 
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