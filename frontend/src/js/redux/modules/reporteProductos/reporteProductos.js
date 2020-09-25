import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { api } from "api";
// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    "reporteProducto", //identificador dentro del store.
    "reporte_producto" //endpoint donde realizará las peticiones.
);

const setItem = (item) => ({
    type: "REPORTEPRODUCTO_ITEM",
    item,
});

const reporteTotal = () => (dispatch) => {
    // dispatch(setLoader(true));
    api.get("reporte_producto/total")
        .then((response) => {
            dispatch(setItem(response));
        })
        .catch(() => {})
        .finally(() => {
            // dispatch(setLoader(false));
        });
};

export const actions = {
    ...baseReducer.actions,
    reporteTotal,
};

export default handleActions(baseReducer.reducers, baseReducer.initialState);
