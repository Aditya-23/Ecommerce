
const initState = {
    user : {
        email : "",
        firstname : "",
        lastname : "",
        phone : "",
        username : "",
    },
    authenticated : false,
    token : "",
    error : "",
}

const authReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case "user_logging_in":
            console.log("logging in!!!")
            const { email, firstname, lastname, phone, username} = action.payload.user;
            state.user = {
                email, firstname, lastname, phone, username
            };
            state.authenticated = true;
            state.token = action.payload.token
            break;
        case "Incorrect email" : 
            state.authenticated = false;
            state.token = "";
            break;
        case "Incorrect Password" : 
            state.authenticated = false;
            state.token = "";
            break;
        case "user_logged_in" : 
            state.authenticated = true;
            state.user = {
                ...action.payload.user
            }
            state.token = action.payload.token;
            break;
        case "user_needs_to_login" :
            state.authenticated = false;
            state.user = {};
            state.token = "";
            break;
        case "user_signout" : 
            state.authenticated = false;
            state.user = {};
            state.token = "";
            break;
        case "signout_failed" :
            state.error = "Signout failed";
            state.token = "";
            state.authenticated = false
            break;
        default:
            break;
    }
    return state
}


export default authReducer;