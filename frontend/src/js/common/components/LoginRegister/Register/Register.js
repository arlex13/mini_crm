import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoadMask from "../../Utils/LoadMask/LoadMask";

class Registro extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit, loader } = this.props;
        if (localStorage.getItem("token")) {
            return <Redirect to="/" />;
        }
        return (
            <div className="blue-gradient-bg">
                <br />
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <img
                        src="https://images-eu.ssl-images-amazon.com/images/G/31/Press_Releases/amazonIN_logo_thumb._CB485921301_.jpg"
                        alt="Logo"
                    />
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv txt-35-n color-4AC">
                            REGISTRO
                        </h5>
                        <LoadMask loading={loader} light>
                            <RegisterForm onSubmit={onSubmit} />
                            <span>
                                ¿Ya tienes cuenta?&nbsp;
                                <Link to="/login">Ingresa aquí</Link>
                            </span>
                            <br />
                            <span className="color-FF4">
                                <Link to="/" className="color-FF4 txt-16-n">
                                    Comprar Ahora
                                </Link>
                            </span>
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registro;
