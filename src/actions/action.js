
export const checkLeaveType = (id) => (
    {
    type:'leaveTypeChecked',
    leaveType:id
    }
)

export const login = name => {
    return {
        type:'login',
        user:name,
    }
} 
export const deleteSelectedDates= dateArr => {
    return {
        type:'deleteSelectedDates',
        selectedDates:dateArr,
    }
} 
export const saveSelectedDates= dateArr => {
    return {
        type:'saveSelectedDates',
        selectedDates:dateArr,
    }
} 
export const copySelectedDates = i => {
    return {
        type:'copySelectedDates',
        whichOne:i,
    }
}
export const toggleCalendar = {
    type:'toggleCalendar',
}