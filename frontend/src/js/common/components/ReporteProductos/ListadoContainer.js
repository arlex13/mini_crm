import { connect } from "react-redux";
import { actions } from "../../../redux/modules/reporteProductos/reporteProductos";
import Listado from "./Listado";

const ms2p = (state) => {
    return {
        ...state.reporteProducto,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
