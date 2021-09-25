import React, {useState} from 'react';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';
import Rectangle from '../rectangle/Rectangle';


function App() {

  const rects = [...Array(5)].map((_, i) => ({
    id: i.toString(),
    x: i * 100,
    y: 0,
  }));
  
  const [selectedId, selectShape] = useState(0);

  const handleSelect = (id) => {
    selectShape(id)
  }

    return (
      <Stage 
      width={500} 
      height={200}
      >
        <Layer >
          {
            rects.map(rect => {
              return <Rectangle 
                x={rect.x}
                y={rect.y}
                key={rect.id}
                id={rect.id}
                onSelect={() => selectShape(rect.id)}
                isSelect={selectedId}
              />
            })
          }
        </Layer>
      </Stage>
    );
}

export default App;