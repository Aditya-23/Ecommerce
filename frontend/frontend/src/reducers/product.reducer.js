const initState = {
    alert : "",
    categoryProducts : [],
    allProductsLoaded : false
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case "get_all_category_products":
            state.categoryProducts = action.payload.products
            state.allProductsLoaded = true;
            break;
    
        default:
            break;
    }
    // console.log("product state : ", state)
    return state;
}

export default productReducer;