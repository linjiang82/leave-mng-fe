let today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth(); 
let init = {
  month:month,
  year:year
}
export default (state=init,action) => {
  switch(action.type){
    case 'previous':
    return state={
      ...state,
      month:state.month-1
    }
    break;
    case 'next':
    return state={
      ...state,
      month:state.month+1
    }
    break;
    default:
    return state;
  }  
}