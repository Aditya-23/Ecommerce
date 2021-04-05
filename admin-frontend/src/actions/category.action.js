import ecomAxios from "../helpers/axios";


export const getCategories = (token) => {
    return async (dispatch) => {
        var result = await ecomAxios.get("/api/admin-category/get-categories", {
            headers : {
                Authorization : token
            }
        })
        if(result.status == 200){
            dispatch({
                type: "got_all_categories",
                payload : {
                    categories : result.data.categories,
                },
            })
        }
    }
}

export const addCategory = (formData, token) => {
    return async (dispatch) => {
        var result = await ecomAxios.post("/api/admin-category/add-category", formData, {
            headers : {
                Authorization : token
            }
        })
        if(result.status == 201){
            dispatch({
                type : "add_new_category",
            })
        }
    }
}