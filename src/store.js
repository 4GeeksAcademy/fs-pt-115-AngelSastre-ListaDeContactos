// Estado inicial
export const initialStore = () => ({
	contacts: []
});

// Reducer
export const storeReducer = (state, action) => {
	switch (action.type) {
		case "SET_CONTACTS":
			return { ...state, contacts: action.payload };
		case "ADD_CONTACT":
			return { ...state, contacts: [...state.contacts, action.payload] };
		case "UPDATE_CONTACT":
			return {
				...state,
				contacts: state.contacts.map(contact =>
					contact.id === action.payload.id ? action.payload : contact
				)
			};
		case "DELETE_CONTACT":
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload)
			};
		default:
			return state;
	}
};

// Acciones
export const getActions = (dispatch) => ({


	createAgenda: async () => {
		const response = await fetch("https://playground.4geeks.com/contact/agendas/angel", { method: "POST" });
		if (!response.ok) {
			console.error("No se pudo crear la agenda");
		}
	},


	getContacts: async () => {
		const response = await fetch("https://playground.4geeks.com/contact/agendas/angel");

		if (!response.ok) {
			if (response.status === 404) {
				await fetch("https://playground.4geeks.com/contact/agendas/angel", { method: "POST" });
				return;
			}
			console.error(`Error al traer contactos: ${response.status}`);
			return;
		}

		const data = await response.json();
		dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });
	},


	addContact: async (contact) => {
		const cleanContact = { ...contact, agenda_slug: "angel" };
		const response = await fetch(
			"https://playground.4geeks.com/contact/agendas/angel/contacts",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(cleanContact)
			}
		);

		if (!response.ok) {
			console.error(`Error al agregar contacto: ${response.status}`);
			return;
		}

		const data = await response.json();
		dispatch({ type: "ADD_CONTACT", payload: data });
	},


	updateContact: async (id, updatedContact) => {
		const cleanContact = { ...updatedContact, agenda_slug: "angel" };
		const response = await fetch(
			`https://playground.4geeks.com/contact/agendas/angel/contacts/${id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(cleanContact)
			}
		);

		if (!response.ok) {
			console.error(`Error al actualizar contacto: ${response.status}`);
			return;
		}

		const data = await response.json();
		dispatch({ type: "UPDATE_CONTACT", payload: data });
	},


	deleteContact: async (id) => {
		const response = await fetch(
			`https://playground.4geeks.com/contact/agendas/angel/contacts/${id}`,
			{ method: "DELETE" }
		);

		if (!response.ok) {
			console.error(`Error al eliminar contacto: ${response.status}`);
			return;
		}

		dispatch({ type: "DELETE_CONTACT", payload: id });
	}
});

