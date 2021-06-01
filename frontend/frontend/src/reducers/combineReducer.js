import {combineReducers} from "redux"
import authReducer from "."
import categoryReducer from "./category.reducer"
import productReducer from "./product.reducer"
import userReducer from "./userReducer"

const rootReducer = combineReducers({
    authReducer : authReducer,
    userReducer : userReducer,
    categoryReducer : categoryReducer,
    productReducer : productReducer,
})

export default rootReducer