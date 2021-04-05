import ecomAxios from "../helpers/axios";

export const addProduct = (product, token) => {
    return async (dispatch) => {
        var result = ecomAxios.post("/api/admin-products/add-product", product, {
            headers : {
                Authorization : token
            }
        })
        console.log("adding product : ", result)
    }
}

export const getAllProducts = (token) => {
    return async(dispatch) =>{
        var result = await ecomAxios.get("/api/admin-products/get-products", {
            headers : {
                Authorization : token
            }
        })
        console.log(result.data.products);
        if(result.status == 201 ){
            dispatch({
                type:"get_all_products",
                payload : {
                    products : result.data.products
                }
            })
        }
    }
}