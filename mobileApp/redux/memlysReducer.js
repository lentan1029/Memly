// ------ ACTIONS FOR MEMLYS REDUCER --------- //

export function updateMemlys(memlys) {
  return {
    type: 'UPDATE_MEMLYS',
    memlys,
  };
}

// export function addMemly(memly) {
//   return {
//     type: 'ADD_MEMLY',
//     memly,
//   };
// }

// export function addToMemlyIdStorage(memlyId) {
//   return {
//     type: 'ADD_TO_MEMLY_ID_STORAGE',
//     memlyId,
//   };
// }


// ---- INITIAL STATE FOR MEMLYS REDUCER ----- //

const memlysInitialState = {
  memlys: [
  ],
  memlyIdStorage: {
 
  }
};


//ideal memlys structure...

// { memlyID: {memly info},
//   memly2ID: {memly info} }... and so on
// this way we could use Object.assign({}, oldLocationMemlys, newLocationMemlys)
// to overwrite duplicates. we could use this to keep storage in check as well

// ------------------ MEMLY REDUCER ----------------------- //



export default function memlysReducer(state = memlysInitialState, action) {

  switch (action.type) {

  case 'UPDATE_MEMLYS':
    {
      return {
        memlys: action.memlys,
        memlyIdStorage: action.memlys.map((memly) => (memly._id))
      };
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
