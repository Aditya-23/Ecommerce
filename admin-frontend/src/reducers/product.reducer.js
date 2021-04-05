const initState = {
    alert : "",
    products : [],
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case "get_all_products":
            state.products = action.payload.products
            break;
    
        default:
            break;
    }
    console.log("product state : ", state)
    return state;
}

export default productReducer;