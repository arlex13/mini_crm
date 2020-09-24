import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { renderField, renderCurrency } from "../Utils/renderField";

const validate = (values) => {
    const errors = {};
    if (!values.cantidad) {
        errors.cantidad = "Campo requerido";
    }
    if (!values.nombre) {
        errors.nombre = "Campo requerido";
    }
    if (!values.direccion) {
        errors.direccion = "Campo requerido";
    }
    if (!values.telefono) {
        errors.telefono = "Campo requerido";
    }
    return errors;
};

const Formulario = ({ producto, handleSubmit, handleChange }) => {
    const [Total, setTotal] = useState(0);
    return (
        <form onSubmit={handleSubmit} className="txt-16" style={{ width: 250 }}>
            <p className="txt-25-n color-BE1 mb-2">Producto:</p>
            <p className="mb-1 txt-16-n"> Producto: {producto.nombre}</p>
            <p className="mb-1 txt-13-n"> Stock: {producto.cantidad}</p>
            <p className="mb-1 txt-16-n"> Precio: {producto.precio}</p>
            <p className="mb-1 txt-16-n"> Total: Q{Total}</p>

            <label className="txt-18-n color-057">Cantidad: </label>
            <Field
                name="cantidad"
                type="number"
                onChange={(e) => {
                    setTotal(producto.precio * e.target.value);
                    handleChange;
                }}
                component={renderField}
                max={producto.cantidad}
                min={0}
            />

            <p className="txt-25-n color-BE1 mb-2">Datos personales</p>
            <label className="txt-18-n color-057">Nombre: </label>
            <Field name="nombre" component={renderField} />
            <label className="txt-18-n color-057">Direccion</label>
            <Field name="direccion" component={renderField} />
            <label className="txt-18-n color-057">Telefono</label>
            <Field name="telefono" component={renderField} type="number" />
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn-primario2" type="submit">
                    Comprar
                </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "VentaForm",
    validate,
})(Formulario);
