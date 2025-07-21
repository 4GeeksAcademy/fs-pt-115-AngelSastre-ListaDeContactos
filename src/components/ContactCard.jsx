import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { getActions } from "../store";
import avatar from "../assets/img/avatar.jpg";
import { DeleteModal } from "./DeleteModal";

export const ContactCard = ({ contact }) => {
    const { dispatch } = useGlobalReducer();
    const actions = getActions(dispatch);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        await actions.deleteContact(contact.id);
        setShowModal(false);
    };

    return (
        <div className="card shadow-sm p-4 d-flex flex-row align-items-center">
            <img
                src={avatar}
                alt={`Foto de ${contact.name}`}
                className="rounded-circle ms-3 me-5"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />

            <div className="flex-grow-1">
                <h5 className="card-title">
                    <i className="fas fa-user text-secondary me-2"></i>
                    {contact.name}
                </h5>
                <p className="card-text mb-1">
                    <i className="fas fa-envelope text-secondary me-2"></i>
                    {contact.email}
                </p>
                <p className="card-text mb-1">
                    <i className="fas fa-phone text-secondary me-2"></i>
                    {contact.phone}
                </p>
                <p className="card-text mb-2">
                    <i className="fas fa-map-marker-alt text-secondary me-2"></i>
                    {contact.address}
                </p>
                <div className="d-flex gap-2">
                    <Link to={`/single/${contact.id}`} className="btn btn-info btn-sm">
                        Ver Detalles
                    </Link>
                    <Link to={`/add-contact?id=${contact.id}`} className="btn btn-primary btn-sm">
                        Editar
                    </Link>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setShowModal(true)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>

            {/* Modal */}
            <DeleteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                contactName={contact.name}
            />
        </div>
    );
};
