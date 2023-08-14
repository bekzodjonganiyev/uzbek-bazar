import { combineReducers } from "redux"
import { testReducer } from "./test"
import { productCardReducer } from "./product-card-reducer"

const reducers = combineReducers({
    test: testReducer,
    product: productCardReducer
})

export default reducers;