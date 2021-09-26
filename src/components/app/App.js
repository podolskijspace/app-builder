import React, {useState} from 'react';
import {Layer, Stage} from 'react-konva';
import Rectangle from '../rectangle/Rectangle';


function App() {
  const rects = [
    {
      id: '0',
      x: 0,
      y: 0,
    },
    {
      id: '1',
      x: 100,
      y: 0,
    },
    {
      id: '2',
      x: 200,
      y: 0,
    },
    {
      id: '3',
      x: 300,
      y: 0,
    },
  ]
  
  const [selectedId, changeSelected] = useState(["1", "3"]);

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
          rects.map((rect, i) => {
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
                    changeSelected([...selectedId.slice(0,key), ...selectedId.slice(key + 1)]);//Если повторяется, то убираем
                  }
                } else {
                  if (selectedId.length === 1 && selectedId[0] === rect.id) {
                    changeSelected([])
                  } else {
                    changeSelected([...rect.id])
                  }
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