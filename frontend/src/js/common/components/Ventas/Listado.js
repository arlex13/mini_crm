import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import Cards from "./cards";
import "./cards.css";
import LoadMask from "../Utils/LoadMask/LoadMask";
class Listado extends Component {
    componentWillMount = () => {
        this.props.listar();
    };

    render() {
        console.log("ESTADO: ", this.props);
        const {
            data,
            loader,
            searchChange,
            onPageChange,
            onSortChange,
            eliminar,
            listar,
            page,
            me,
        } = this.props;
        if (me) {
            console.log("yo soy el mee", me);
        }

        const username = me ? me.username : false;
        return (
            <div className="d-flex flex-column w-100">
                <div className="d-flex flex-wrap mb-2  mt-5">
                    <h3 className="txt-35-n color-003 w-50">
                        Productos Disponiles
                    </h3>

                    <div className="d-flex flex-row justify-content-between align-items-center flex-fill ">
                        {/* <a className="btn-primario2" href="/#/roles/create">
                            Agregar Rol
                        </a> */}
                        <div className="flex-fill d-flex align-items-center ml-3">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => searchChange(e.target.value)}
                                placeholder="Buscar..."
                                style={{
                                    border: "2px solid #E5E5E5",
                                    borderRadius: "12px",
                                    paddingRight: "35px",
                                }}
                            />
                            <i
                                className="icono material-icons"
                                style={{
                                    marginLeft: -35,
                                }}
                            >
                                search
                            </i>
                        </div>
                    </div>
                </div>
                <LoadMask loading={loader} light>
                    <div class="container">
                        <div class="row">
                            {data.results.map((producto) => (
                                <Cards
                                    key={producto.id}
                                    producto={producto}
                                    desactivar={
                                        username === producto.vendedor
                                            ? false
                                            : true
                                    }
                                    mayorCero={
                                        producto.cantidad > 0 ? true : false
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className="tablaTicket">
                        <Grid
                            data={data}
                            loading={loader}
                            onPageChange={listar}
                            page={page}
                            onSortChange={onSortChange}
                        >
                            <TableHeaderColumn
                                isKey
                                dataField="nombre"
                                dataSort
                            >
                                Nombre
                            </TableHeaderColumn>
                        </Grid>
                    </div>
                </LoadMask>
            </div>
        );
    }
}

export default Listado;
