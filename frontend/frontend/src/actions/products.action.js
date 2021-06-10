import ecomAxios from "../helpers/axios";

export const getAllCategoryProducts = (token, categoryName) => {
    return async(dispatch) =>{
        console.log("Token:  ", token);
        var result = await ecomAxios.get("/api/products/get-products-by-category/" + categoryName, {
            headers : {
                Authorization : token
            }
        })
        // console.log(result.data.products);
        if(result.status == 201 ){
            dispatch({
                type:"get_all_category_products",
                payload : {
                    products : result.data.products
                }
            })
        }
    }
}

