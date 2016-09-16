export function updateCurrentMemly(memly) {
  return {
    type: 'UPDATE_MEMLY',
    memly,
  };
}

export default function memlysReducer(state = {}, action) {
  switch (action.type) {

    case 'UPDATE_MEMLY':
      {
        return {
          ...state,
          currentMemly: action.memly
        }
      }
      // case 'ADD_MEMLY' : {
      //   return {
      //     ...state,
      //     memlys: [action.memly, ...state.memlys],
      //   }
      // }


  default : return state;

  }
}