import React, { Component } from "react";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class Listado extends Component {
    componentWillMount = () => {
        this.props.listar();
    };

    render() {
        const {
            data,
            loader,
            searchChange,
            onPageChange,
            onSortChange,
            eliminar,
            listar,
            page,
        } = this.props;

        return (
            <div className="d-flex flex-column w-100">
                <div className="d-flex flex-wrap mb-2  mt-5">
                    <h3 className="txt-35-n color-003 w-50">Productos</h3>

                    <div className="d-flex flex-row justify-content-between align-items-center flex-fill ">
                        <a className="btn-primario2" href="/#/productos/create">
                            Agregar Producto
                        </a>
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
                <Grid
                    data={data}
                    loading={loader}
                    onPageChange={listar}
                    page={page}
                    onSortChange={onSortChange}
                >
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        // dataSort
                        dataFormat={standardActions({
                            editar: "productos",
                            ver: "productos",
                            eliminar,
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="nombre" dataSort>
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="precio" dataSort>
                        Precio
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="cantidad" dataSort>
                        Cantidad
                    </TableHeaderColumn>
                </Grid>
            </div>
        );
    }
}

export default Listado;
