import React, { useEffect } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { getActions } from "../store";
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    const actions = getActions(dispatch);

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Lista de Contactos</h2>
            {store.contacts.length === 0 ? (
                <p>No hay contactos todavía.</p>
            ) : (
                <div className="row">
                    {store.contacts.map((contact) => (
                        <div className="col-12 mb-3" key={contact.id}>
                            <ContactCard contact={contact} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

