import { connect } from "react-redux";
import { actions } from "../../../redux/modules/productos/productos";
import Listado from "./Crear";

const ms2p = (state) => {
    return {
        ...state.productos,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Listado);
