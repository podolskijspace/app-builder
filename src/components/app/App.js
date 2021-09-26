import React, {useState, useEffect} from 'react';
import {Layer, Stage} from 'react-konva';
import Rectangle from '../rectangle/Rectangle';
import { connect } from 'react-redux';
import {addNewElem} from '../../redux/actions';


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
];


function App({addNewElem}) {
  
  const [rects, setRectangles] = React.useState(initialRectangles);
  const [selectedId, changeSelected] = useState(["1", "3"]);

  // useEffect(() => {
  //   const onKeypress = e => {
  //     const newArr = [];

  //     const pushElem = (attr) => {
  //       newArr[newArr.length] = {...attr}
        
  //       newArr[newArr.length - 1].y += 100;
  //       newArr[newArr.length - 1].id = rects.length;
        
  //     }

  //     if (e.key === 'Tab' && e.ctrlKey) {
  //       rects.forEach((rect, id) => {
  //         if (!!~selectedId.indexOf(id + '')) {
  //           pushElem(rect);
  //         }
  //       })

  //       const rectangles = [...rects, ...newArr];

  //       setRectangles(rectangles);
  //     }
  //   }
  
  //   document.addEventListener('keypress', onKeypress);
  
  //   return () => {
  //     document.removeEventListener('keypress', onKeypress);
  //   };
  // }, [selectedId]);

  const checkMissClick = (e) => { //Проверка, если клик по пустому месту
    if (e.target === e.target.getStage()) {
      changeSelected([]);
    }
  }

  return (
    < div onKeyUp={()=> {console.log('sd')}}>
      <Stage 
      width={500} 
      height={1000}
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
    </div>
  );
}

const mstp =(state) => {
  return {
    rects: state.rects
  }
}

const mdtp = {
  addNewElem,
}

export default connect(mstp, mdtp)(App);