import React, {useState, useEffect} from 'react';
import {Layer, Stage} from 'react-konva';
import Rectangle from '../rectangle/Rectangle';


const initialRectangles = [
  {
    id: 'sadfer',
    width: 100,
    height: 100,
    stroke:"blue",
    strokeWidth:1,
    x: 10,
    y: 20,
  },
  {
    id: 'sadvfvb',
    width: 100,
    height: 100,
    stroke:"blue",
    strokeWidth:1,
    x: 110,
    y: 20,
  },
  {
    id: 'sadfsdac',
    width: 100,
    height: 100,
    stroke:"blue",
    strokeWidth:1,
    x: 210,
    y: 20,
  },
  {
    id: 'asdf',
    width: 100,
    height: 100,
    stroke:"blue",
    strokeWidth:1,
    x: 310,
    y: 20,
  },
];


function App() {
  
  const [rects, setRectangles] = React.useState(initialRectangles);
  const [selectedId, changeSelected] = useState(["1", "3"]);

  useEffect(() => {
    const onKeypress = e => {
      const newArr = [];

      const newKey = () => {
        let newKey = '';

        for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
          switch (Math.floor(Math.random() * 26) + 1) {
            case 1:
              newKey += 'a';
              break;
            case 2:
              newKey += 'b';
              break;
            case 3:
              newKey += 'c';
              break;
            case 4:
              newKey += 'd';
              break;
            case 5:
              newKey += 'e';
              break;
            case 6:
              newKey += 'f';
              break;
            case 7:
              newKey += 'g';
              break;
            case 8:
              newKey += 'h';
              break;
            case 9:
              newKey += 'i';
              break;
            case 10:
              newKey += 'j';
              break;
            case 11:
              newKey += 'k';
              break;
            case 12:
              newKey += 'l';
              break;
            case 13:
              newKey += 'm';
              break;
            case 14:
              newKey += 'n';
              break;
            case 15:
              newKey += 'o';
              break;
            case 16:
              newKey += 'p';
              break;
            case 17:
              newKey += 'q';
              break;
            case 18:
              newKey += 'r';
              break;
            case 19:
              newKey += 's';
              break;
            case 20:
              newKey += 't';
              break;
            case 21:
              newKey += 'u';
              break;
            case 22:
              newKey += 'v';
              break;
            case 23:
              newKey += 'w';
              break;
            case 24:
              newKey += 'x';
              break;
            case 25:
              newKey += 'y';
              break;
            case 26:
              newKey += 'z';
              break;
            default:
          }
        }
        return newKey;
      }
      
      const pushElem = (attr) => {
        newArr[newArr.length] = {...attr}
        
        newArr[newArr.length - 1].y += 100;
        newArr[newArr.length - 1].id = newKey();        
      }

      if (e.key === 'Tab' && e.ctrlKey) {
        rects.forEach((rect) => {
          if (!!~selectedId.indexOf(rect.id)) {
            pushElem(rect);
          }
        })

        const rectangles = [...rects, ...newArr];

        setRectangles(rectangles);
      }
    }
  
    document.addEventListener('keypress', onKeypress);
  
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [selectedId]);

  const checkMissClick = (e) => { //Проверка, если клик по пустому месту
    if (e.target === e.target.getStage()) {
      changeSelected([]);
    }
  }

  return (
    <Stage 
    width={window.innerWidth} 
    height={window.innerHeight}
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
                    changeSelected([...selectedId,rect.id])
                  } else {
                    changeSelected([...selectedId.slice(0,key), ...selectedId.slice(key + 1)]);//Если повторяется, то убираем
                  }
                } else {
                  if (selectedId.length === 1 && selectedId[0] === rect.id) {
                    changeSelected([])
                  } else {
                    changeSelected([rect.id])
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