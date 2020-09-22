import React, { Component } from "react";
import Formulario from "./Formulario";

class Crear extends Component {
    constructor(props) {
        super(props);
        this.state = { imagen: null };
    }

    componentWillMount = () => {
        const { match, leer } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leer(id);
        }
    };

    actualizarFormulario = (data) => {
        const { editar2 } = this.props;
        console.log("esto son los datos actualizarFormulario", data);
        editar2(data.id, { ...data, imagen: null }, [
            { file: this.state.imagen, name: "imagen" },
        ]);
    };
    // actualizarFormulario = (data) => {
    //     const { editar } = this.props;
    //     editar(data.id, data);
    // };
    crear = (data) => {
        const { crear2 } = this.props;
        console.log("esto son los datos", data);
        const imagenx = { file: this.state.imagen, name: "imagen" };
        crear2({ ...data, imagen: null }, [imagenx]);
    };

    setImagen = (imagen) => {
        this.setState({ imagen });
    };

    render() {
        const { match, location, item } = this.props;
        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : this.crear;

        return (
            <div className="d-flex flex-column w-100">
                <Formulario
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                    datos={item}
                    setImagen={this.setImagen}
                />
            </div>
        );
    }
}

export default Crear;
