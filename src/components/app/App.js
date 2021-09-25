import React, {useState} from 'react';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';
import Rectangle from '../rectangle/Rectangle';


function App() {

  const rects = [...Array(5)].map((_, i) => ({
    id: (i+1).toString(),
    x: i * 100,
    y: 0,
  }));
  
  const [selectedId, changeSelected] = useState(["2", "1"]);

  const checkMissClick = (e) => { //Проверка, если клик по пустому месту
    if (e.target === e.target.getStage()) {
      changeSelected([]);
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
              onSelect={(e) => {
                if (e.evt.shiftKey) { //Проверка, что зажата кнопка шифт
                  const key = selectedId.indexOf(rect.id);
                  if(!~key) { //Проверка, что этот индекс не повторяется
                    changeSelected([...selectedId,...rect.id])
                  } else {
                    changeSelected([...selectedId.slice(0,key), ...selectedId.slice(key + 1)]);
                  }
                } else {                    
                  changeSelected([...rect.id])
                }
              }}
              isSelect={selectedId}
            />
          })
        }
      </Layer>
    </Stage>
  );
}

export default App;