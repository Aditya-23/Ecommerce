const initState = {
    error : "",
    message : "",
    loading : false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "admin_register" :
            state = {
                ...state,
                message : action.payload.message
            }
            break;
        
        case "could_not_register" : 
            state = {
                ...state,
                error : "Failed to register the user."
            }
            break;
        default:
            break;
    }

    return state
}
export default userReducer;