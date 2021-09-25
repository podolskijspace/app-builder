import React, {useState} from 'react';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';
import Rectangle from '../rectangle/Rectangle';


function App() {

  const rects = [...Array(5)].map((_, i) => ({
    id: (i+1).toString(),
    x: i * 100,
    y: 0,
  }));
  
  const [selectedId, changeSelected] = useState(3);

  const handleSelect = (id) => {
    changeSelected(id)
  }

  const checkMissClick = (e) => {
    if (e.target === e.target.getStage()) {
      changeSelected(null);
    }
  }

    return (
      <Stage 
      width={500} 
      height={200}
      onMouseDown={checkMissClick}
      onTouchStart={checkMissClick}
      >
        <Layer >
          {
            rects.map(rect => {
              return <Rectangle 
                x={rect.x}
                y={rect.y}
                key={rect.id}
                id={rect.id}
                onSelect={() => changeSelected(rect.id)}
                isSelect={selectedId}
              />
            })
          }
        </Layer>
      </Stage>
    );
}

export default App;