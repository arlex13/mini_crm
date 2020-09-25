import React from "react";
import "./cards.css";
import moment from "moment";

const Cards = ({ producto, desactivar, mayorCero, btnComprar }) => {
    return (
        <React.Fragment>
            {/* <div className="d-flex flex-row"> */}

            <div class="col-12 col-sm-8 col-md-6 col-lg-4 my-2">
                <div class="card">
                    <img
                        class="card-img"
                        src={producto.imagen}
                        alt="Vans"
                        style={{ height: 200 }}
                    />
                    {!desactivar ? (
                        <div class="card-img-overlay d-flex justify-content-center align-items-center">
                            <span class="badge badge-warning">Mi producto</span>
                        </div>
                    ) : (
                        !mayorCero && (
                            <div class="card-img-overlay d-flex justify-content-center align-items-center">
                                <span class="badge badge-danger">
                                    Sin producto
                                </span>
                            </div>
                        )
                    )}

                    <div class="card-body">
                        <h4 class="card-title txt-20-n color-003">
                            {producto.nombre}
                        </h4>
                        <h6 class="card-subtitle txt-16 ">
                            Stock: {producto.cantidad}
                        </h6>
                        <br />
                        <p class="card-text txt-16">{producto.descripcion}</p>

                        <div class="buy d-flex justify-content-between align-items-center">
                            <div class="price txt-18-n color-FF4">
                                <h5 class="mt-4">Q {producto.precio} </h5>
                            </div>

                            <button
                                type="button"
                                class="btn btn-danger mt-3"
                                onClick={() => {
                                    btnComprar(true, producto);
                                }}
                            >
                                Comprar
                            </button>
                        </div>
                        <br />
                        <p class=" txt-13 ">
                            Publicado:{" "}
                            {moment(producto.creado).format("L, h:mm a")}
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Cards;
