export default (state={},action) => {
    if(action.type==="leaveTypeChecked")
    return state={
        ...state,
        leaveType:action.leaveType
    }
    return state 
}