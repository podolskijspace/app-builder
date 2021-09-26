import React, {useState} from 'react';
import {Layer, Stage} from 'react-konva';
import Rectangle from '../rectangle/Rectangle';

const initialRectangles = [
  {
    id: '0',
    width: 100,
    height: 100,
    stroke:"blue",
    strokeWidth:1,
    x: 10,
    y: 20,
  },
  {
    id: '1',
    width: 100,
    height: 100,
    stroke:"blue",
    strokeWidth:1,
    x: 110,
    y: 20,
  },
  {
    id: '2',
    width: 100,
    height: 100,
    stroke:"blue",
    strokeWidth:1,
    x: 210,
    y: 20,
  },
  {
    id: '3',
    width: 100,
    height: 100,
    stroke:"blue",
    strokeWidth:1,
    x: 310,
    y: 20,
  },
]

function App() {
  
  const [rects, setRectangles] = React.useState(initialRectangles);
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
              shapeProps = {rect}
              id={rect.id}
              key={rect.id}
              onChange={(newAttrs) => {
                const rectangles = rects.slice();
                rectangles[i] = newAttrs;
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