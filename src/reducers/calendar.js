let today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth(); 
let init = {
  month:month,
  year:year
}
export default (state=init,action) => {
  switch(action.type){
    case 'reset':
      return state = {
        ...state,
        month:init.month,
        year:init.year
      }
    case 'gotoDate':
      return state = {
        ...state,
        month:action.month,
        year:action.year
      }
    case 'previous':
    if(state.month===0)
    return state={
      ...state,
      month:11,
      year:state.year-1
    }
    return state={
      ...state,
      month:state.month-1
    }
    break;
    case 'next':
    if(state.month===11)
    return state={
      ...state,
      month:0,
      year:state.year+1
    }
    return state={
      ...state,
      month:state.month+1
    }
    break;
    default:
    return state;
  }  
}