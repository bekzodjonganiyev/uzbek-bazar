import { combineReducers } from "redux"
import { testReducer } from "./test"
import { productCardReducer } from "./product-card-reducer"
import { sheetContentReducer } from "./sheet-content-reducer";

const reducers = combineReducers({
    test: testReducer,
    product: productCardReducer,
    sheetContent: sheetContentReducer
})

export default reducers;