import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "ventas",
    "producto/producto_venta"
);

export default handleActions(reducers, initialState);
