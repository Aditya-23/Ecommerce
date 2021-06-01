import ecomAxios from "../helpers/axios"; 

export const adminRegister = (user) => {
    return async (dispatch) => {
        try {
            const result = await ecomAxios.post("/api/auth/signup", {
                ...user
            })
            if(result){
                if(result.status == 201){
                    dispatch({
                        type : "admin_register",
                        payload : {
                            message : "User Registered"
                        }
                    })
                }
                else if(result.status == 400){
                    dispatch({
                        type : "could_not_register"
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}