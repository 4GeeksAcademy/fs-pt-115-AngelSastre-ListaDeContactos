import { useContext, useReducer, createContext } from "react";
import { storeReducer, initialStore, getActions } from "../store";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    const actions = getActions(dispatch);
    return (
        <StoreContext.Provider value={{ store, dispatch, actions }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useGlobalReducer = () => useContext(StoreContext);
