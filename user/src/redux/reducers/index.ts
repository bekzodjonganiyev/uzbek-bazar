import { combineReducers } from "redux";
import { testReducer } from "./test";
import { sheetContentReducer } from "./sheet-content-reducer";
import { cartReducer } from "./cart-reducer";
import { wishlistReducer } from "./wishlist-reducer";

const reducers = combineReducers({
  test: testReducer,
  sheetContent: sheetContentReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export default reducers;
