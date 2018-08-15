const init={
    isFetching:true,
    isLogin:null,
    annualLeaveLeft:null,
    sickLeaveLeft:null,
    user:null,
    appStatus:[],
    selectedDates:[],
    toggleCalendar:false,
}
export default (state=init,action) => {
    switch(action.type){
        case 'login':{
            return state={
                ...state,
                isLogin:true,
                user:action.user
            }
            break;
        }
        case 'logout':{
            return state={
                ...state,
                isLogin:false,
                user:null
            }
        break;
        }
        case 'leaveTypeChecked':{
            return state={
                ...state,
                isExcess:false,
            }
            break;
        }
        case 'fetchdata_FULFILLED':{
            return state={
                ...state,
                annualLeaveLeft:action.payload.data[0].annualLeaveLeft,
                sickLeaveLeft:action.payload.data[0].sickLeaveLeft
            }
        break;
        }
        case 'logout':{
            return state={
                ...state,
                isLogin:false
            }
            break;
        }
        case "readStatus_PENDING":{
           return state = {
               ...state,
               isFetching:true,
        }
        break;
    }
        case "readStatus_FULFILLED":{
            state.appStatus=[];
            for(let i=0;i<action.payload.data.length;i++){
                if(action.payload.data[i].user===state.user){
                    state={
                        ...state,
                        isFetching:false,
                        appStatus:[...state.appStatus,{
                            appId:action.payload.data[i]._id,
                            user:action.payload.data[i].user,
                            leaveType:action.payload.data[i].leaveType,
                            leaveDays:action.payload.data[i].leaveDays,
                            status:action.payload.data[i].status||"Pending",
                        }]
                    }
                }
            }
           return state; 
           break;
        }
        case "readAll_PENDING":{
            return state={
                ...state,
                isFetching:true,
            }
            break;
        }
        case "readAll_FULFILLED":{
            state.appStatus=[];
            for(let i=0;i<action.payload.data.length;i++){
                    state={
                        ...state,
                        isFetching:false,
                        appStatus:[...state.appStatus,{
                            appId:action.payload.data[i]._id,
                            user:action.payload.data[i].user,
                            leaveType:action.payload.data[i].leaveType,
                            leaveDays:action.payload.data[i].leaveDays,
                            selectedDates:action.payload.data[i].selectedDates,
                            status:action.payload.data[i].status||"Pending",
                        }]
                    }
            }
           return state; 
           break;
        }
        case "saveSelectedDates":{
                    state={
                        ...state,
                        selectedDates:[...state.selectedDates,action.selectedDates]
                    }
           return state; 
           break;
        }
        
        case "deleteSelectedDates":{
                    state={
                        ...state,
                        selectedDates:state.selectedDates.filter(item=>item!==action.selectedDates)
                    }
           return state; 
           break;
        }
        case "copySelectedDates":{
            state={
                ...state,
                selectedDates:state.appStatus[action.whichOne].selectedDates.slice(),
            }
            return state; 
            break;
        }
        case "clearAppStatus":{
            state={
                ...state,
                appStatus:[],
            }
        return state; 
        break;
        }
        default:
        return state;
    }
}
