import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";

import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    "productos", //identificador dentro del store.
    "producto", //endpoint donde realizará las peticiones.
    "ProductoForm", //Nombre del formulario.
    "/productos" //url del componente en el frontend.
);

const crearProducto = (data = {}, attachments = []) => (dispatch) => {
    console.log("este es attachments", attachments);
    api.postAttachments("producto", data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Se a registrado Correctamente",
                "Éxito",
                2000
            );
            dispatch(push("/productos"));
        })
        .catch(() => {
            NotificationManager.error(
                "Error al registrar Producto",
                "Error",
                3000
            );
        })
        .finally(() => {});
};
const editarProducto = (id, data = {}, attachments = []) => (dispatch) => {
    console.log(id);
    api.putAttachments(`producto/${id}/`, data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Datos actualizados Correctamente",
                "Éxito",
                2000
            );
            dispatch(push("/productos"));
        })
        .catch(() => {
            NotificationManager.error("Error al actualizar", "ERROR", 3000);
        })
        .finally(() => {});
};

export const actions = {
    ...baseReducer.actions,
    crearProducto,
    editarProducto,
};

export default handleActions(baseReducer.reducers, baseReducer.initialState);
