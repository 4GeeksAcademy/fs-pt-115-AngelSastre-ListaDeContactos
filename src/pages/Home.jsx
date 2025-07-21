import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="container text-center mt-5">
            <h1>Bienvenido a la Lista de Contactos</h1>
            <p className="lead mt-3">
                Usa la aplicación para gestionar tus contactos: añadir, editar y eliminar fácilmente.
            </p>
            <Link to="/contacts" className="btn btn-primary mt-4">
                Ver Lista de Contactos
            </Link>
        </div>
    );
};
