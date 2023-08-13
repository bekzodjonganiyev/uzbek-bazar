import { combineReducers } from "redux"
import { languageReducer } from "./languageReducer"
import { testReducer } from "./test"

const reducers = combineReducers({
    language: languageReducer,
    test: testReducer
})

export default reducers;