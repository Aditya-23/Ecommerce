import ecomAxios from "../helpers/axios"; 
import Cookies from "js-cookie"
import { cookie } from "express-validator";

const expiryTime = 3600*1000; //30 min

export const adminLogin = ({email,password, cookies}) => {
    return async (dispatch) => {
        try {
            const result = await ecomAxios.post("/api/auth/signin", {
                email, password
            }); 
            
            if(result){
                if(result.status == 201){
                    // window.localStorage.setItem("token", result.data.token);
                    // window.localStorage.setItem("authenticated", true);
                    // window.localStorage.setItem("user", JSON.stringify(result.data.user));
                    cookies.set("user-token", result.data.token, { expires : new Date(Date.now() + expiryTime)});
                    cookies.set("user", result.data.user, { expires : new Date(Date.now() + expiryTime)});
                    dispatch({
                        type : "user_logging_in",
                        payload : {
                            user : result.data.user,
                            token : result.data.token
                        }
                    })
                }
                else if(result.status == 400){
                    if(result.msg == "Incorrect email"){
                        dispatch({
                            type : "invalid_email"
                        })
                    }
                    else if(result.msg == "Incorrect Password"){
                        dispatch({
                            type : "invalid_password"
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
        
    }       
};

export const adminSignout = (cookies) => {
    return async (dispatch) => {
        const result = await ecomAxios.get("/api/admin-auth/signout", {
            headers : {
                Authorization : cookies.get("user-token")
            }
        }, )
        if(result.status == 201){
            cookies.remove("user-token");
            cookies.remove("user")
            dispatch({
                type : "user_signout",
            });
        }
        else{
            dispatch({
                type : "signout_failed"
            })
        }
    }
}

