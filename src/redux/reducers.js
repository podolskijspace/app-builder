const initialState = {
  rects: [
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
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ELEM':
      return {
        ...state,
      };

    default:
      return state;
  }
} 

export default reducer;