import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Single = () => {
    const { store } = useGlobalReducer();
    const { id } = useParams();

    const contact = store.contacts.find(c => c.id === parseInt(id));

    if (!contact) {
        return <p className="text-center mt-5">Contacto no encontrado.</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Detalles de {contact.name}</h2>
            <div className="card p-3 shadow-sm">
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Teléfono:</strong> {contact.phone}</p>
                <p><strong>Dirección:</strong> {contact.address}</p>
            </div>
            <Link to="/contacts" className="btn btn-secondary mt-3">Volver</Link>
        </div>
    );
};
