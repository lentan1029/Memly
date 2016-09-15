export default memlysReducer = function(state = {buttonText: 'no help'}, action) {
  switch (action.type) {
    
  case 'ADD_MEMLY' : {
    console.log(state);
    console.log(action);
    return {
      // memlyIdStorage : {
      //   ...state.memlyIdStorage,
      //   [action.memly['_id']]: true, // DO SOMETHING WITH THISSSS
      // },
      // memlys: [action.memly, ...state.memlys,]
      'buttonText': action.memly.buttonText
    };
  }

  default : return state;
  }
};

//test actions/reducers
// const addMemly = function(memly) {
//   return {
//     type: 'ADD_MEMLY',
//     memly,
//   }
// }
// {
//   type: 'ADD_MEMLY', 
//   memly: {
//     'buttonText': 'HELP'
//   }
// }