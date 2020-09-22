import React from "react";
import { Field, reduxForm } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import {
    renderField,
    renderNumber,
    renderCurrency,
    renderFilePicker,
} from "../Utils/renderField";

import { phone } from "../../../utility/validation";

const ProductoForm = (props) => {
    const { handleSubmit, actualizar, ver, datos, setImagen } = props;

    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                <br></br>
                <div
                    className="mb-4 card card-small p-4"
                    style={{
                        maxWidth: 500,
                    }}
                >
                    <div>
                        <h3 className="m-0 txt-35-n color-003">
                            {actualizar ? "Actualizar" : "Crear"} Producto
                        </h3>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-18-n color-057">Nombre</label>
                            <Field
                                component={renderField}
                                name="nombre"
                                disabled={ver}
                            />
                        </div>
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-18-n color-057">
                                Descripcion
                            </label>
                            <Field
                                component={renderField}
                                name="descripcion"
                                disabled={ver}
                            />
                        </div>
                        <div className="form-group has-feedback flex-1 mb-4">
                            <label className="txt-18-n color-057">Precio</label>
                            <Field
                                name="precio"
                                component={renderCurrency}
                                disabled={ver}
                            />
                        </div>
                        <div className="form-group has-feedback">
                            <label className="txt-18-n color-057">
                                Cantidad
                            </label>
                            <Field
                                name="cantidad"
                                component={renderField}
                                disabled={ver}
                                type="number"
                                min="0"
                            />
                        </div>
                        <div className="form-group has-feedback">
                            <label className="txt-18-n color-057">Imagen</label>
                            <Field
                                name="imagen"
                                photo={
                                    (ver || actualizar) && datos.imagen
                                        ? datos.imagen
                                        : null
                                }
                                setFile={setImagen}
                                component={renderFilePicker}
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center">
                        <a className="btn-secundario2 mr-2" href="/#/productos">
                            Cancelar
                        </a>
                        {!ver && (
                            <button type="submit" className="btn-primario2">
                                {actualizar ? "Actualizar" : "Registrar"}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "ProductoForm", // a unique identifier for this form
})(ProductoForm);
