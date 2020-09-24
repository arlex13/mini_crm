import { connect } from "react-redux";
import { actions } from "../../../redux/modules/ventas/ventas";
import Listado from "./Listado";

import { actionsModal } from "../../../redux/modules/modalCompra/modalCompra";

const ms2p = (state) => {
    const me = state.login.me;
    return {
        ...state.ventas,
        me,
        ...state.modal,
    };
};

const md2p = { ...actions, ...actionsModal };

export default connect(ms2p, md2p)(Listado);
