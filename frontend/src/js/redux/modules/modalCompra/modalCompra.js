import { handleActions } from "redux-actions";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { actions } from "../ventas/ventas";

const SHOW_MODAL = "SHOW_MODAL";
const PRODUCTO = "PRODUCTO";

const showModal = (show) => (dispatch) => {
    dispatch({ type: SHOW_MODAL, show_modal: show });
};
const setProductos = (producto) => ({
    type: PRODUCTO,
    producto,
});
const btnComprar = (comprar, producto) => (dispatch) => {
    dispatch(showModal(comprar));
    if (!comprar) {
        producto = {};
    }
    dispatch(setProductos(producto));
};

const comprarProducto = (data) => (dispatch, getStore) => {
    const producto = getStore().modal.producto;
    data.producto = producto.id;

    api.post("factura", data)
        .then(() => {
            NotificationManager.success("Compra Exitosa", "Éxito", 3000);
            dispatch(btnComprar(false));
            dispatch(actions.listar());
        })
        .catch(() => {
            NotificationManager.error("Error al comprar", "ERROR");
        })
        .finally(() => {});
};

export const actionsModal = {
    showModal,
    btnComprar,
    comprarProducto,
};

export const reducers = {
    [SHOW_MODAL]: (state, { show_modal }) => {
        return {
            ...state,
            show_modal,
        };
    },
    [PRODUCTO]: (state, { producto }) => {
        return {
            ...state,
            producto,
        };
    },
};

export const initialState = {
    show_modal: false,
    producto: null,
};

export default handleActions(reducers, initialState);

//container
