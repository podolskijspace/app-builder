import React, {useState} from 'react';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';
import Rectangle from '../rectangle/Rectangle';


function App() {
  const initialRectangles = [
    {
      id: '0',
      x: 100,
      y: 0,
    },
    {
      id: '1',
      x: 200,
      y: 0,
    },
    {
      id: '2',
      x: 300,
      y: 0,
    },
  ]
  
  const [rects, setRectangles] = useState(initialRectangles);
  const [selectedId, changeSelected] = useState(["2", "5"]);

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
              shapeProps={rect}
              id={rect.id}
              onChange={(newAttrs) => {
                const rectangles = rects.slice();
                rects[i] = newAttrs;
                setRectangles(rectangles);
              }}
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