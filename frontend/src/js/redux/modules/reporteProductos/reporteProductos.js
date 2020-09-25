import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "reporteProducto", //identificador dentro del store.
    "reporte_producto" //endpoint donde realizará las peticiones.
);

export default handleActions(reducers, initialState);
