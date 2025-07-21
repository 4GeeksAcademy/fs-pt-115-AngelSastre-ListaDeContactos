import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const contactId = searchParams.get("id");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (!contactId) return;

        const contactToEdit = store.contacts.find(c => c.id === Number(contactId));
        if (contactToEdit) {
            setForm({
                name: contactToEdit.name,
                email: contactToEdit.email,
                phone: contactToEdit.phone,
                address: contactToEdit.address || ""
            });
        }
    }, [contactId, store.contacts]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contactId) {
            await actions.updateContact(contactId, form);
        } else {
            await actions.addContact(form);
        }
        navigate("/contacts");
    };

    return (
        <div className="container mt-4">
            <h1>{contactId ? "Editar Contacto" : "Añadir Contacto"}</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <input
                    className="form-control mb-2"
                    type="text"
                    name="name"
                    placeholder="Nombre Completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-2"
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-2"
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-2"
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
                <button className="btn btn-success w-100" type="submit">
                    {contactId ? "Guardar Cambios" : "Guardar Contacto"}
                </button>
            </form>
        </div>
    );
};
