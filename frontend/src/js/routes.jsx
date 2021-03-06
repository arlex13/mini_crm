import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import { Login, Profile, Registro } from "./common/components/LoginRegister";
import Demo from "./common/components/Demo/Demo";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteVenta from "./ProtectedRouteVenta";
import Examples from "./common/components/Examples/Basic";
import NotFound from "./common/components/layout/NotFound/NotFound";

import "../assets/fonts/fonts.css";

require("../../node_modules/font-awesome/css/font-awesome.css");
require("../../node_modules/bootstrap/dist/css/bootstrap.css");
import "bootstrap/dist/css/bootstrap.min.css";
import Grids from "./common/components/Examples/Grids";
import Notificaciones from "./common/components/Examples/Notificaciones";
import ExampleTabs from "./common/components/Examples/Tabs/Tabs";
require("../style/index.css");

import CrearProducto from "./common/components/Productos/CrearContainer";
import Producto from "./common/components/Productos/ListadoContainer";
import Venta from "./common/components/Ventas/ListadoContainer";
import ReporteProducto from "./common/components/ReporteProductos/ListadoContainer";

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRouteVenta exact path="/" component={Venta} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute
                    exact
                    path="/user-profile"
                    component={Profile}
                />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute
                    exact
                    path="/notifications"
                    component={Notificaciones}
                />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                <ProtectedRoute
                    exact
                    path="/productos-reporte"
                    component={ReporteProducto}
                />

                {/* Productos */}
                <ProtectedRoute exact path="/productos" component={Producto} />
                <ProtectedRoute
                    exact
                    path="/productos/:id/ver"
                    component={CrearProducto}
                />
                <ProtectedRoute
                    exact
                    path="/productos/:id/editar"
                    component={CrearProducto}
                />
                <ProtectedRoute
                    exact
                    path="/productos/create"
                    component={CrearProducto}
                />

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
