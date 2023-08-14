import { combineReducers } from "redux"
import { languageReducer } from "./languageReducer"
import { testReducer } from "./test"
import { productCardReducer } from "./product-card-reducer"

const reducers = combineReducers({
    language: languageReducer,
    test: testReducer,
    product: productCardReducer
})

export default reducers;