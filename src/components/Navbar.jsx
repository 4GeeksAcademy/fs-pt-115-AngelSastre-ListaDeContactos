import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark px-3">

            <Link to="/" className="navbar-brand">
                Lista de Contactos
            </Link>

            <div className="d-flex gap-2">

                <Link to="/" className="btn btn-outline-light">
                    Home
                </Link>

                <Link to="/add-contact" className="btn btn-primary">
                    Añadir Contacto
                </Link>
            </div>
        </nav>
    );
};

