/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';

interface IModalContext {
    modalStatus: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const ModalContext = createContext<IModalContext>({
    modalStatus: false,
    openModal: () => {},
    closeModal: () => {},
});

export function ModalState({ children }: { children: React.ReactNode }) {
    const [modalStatus, setModal] = useState(true);

    const openModal = () => setModal(true);

    const closeModal = () => setModal(false);

    return <ModalContext.Provider value={{ modalStatus, openModal, closeModal }}>{children}</ModalContext.Provider>;
}
