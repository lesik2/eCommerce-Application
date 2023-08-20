/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { IModalContext } from '../data/interfaces';

export const ModalContext = createContext<IModalContext>({
    modalStatus: false,
    openModal: () => {},
    closeModal: () => {},
});

export function ModalState({ children }: { children: React.ReactNode }) {
    const [modalStatus, setModal] = useState(false);

    const openModal = () => setModal(true);

    const closeModal = () => setModal(false);

    return <ModalContext.Provider value={{ modalStatus, openModal, closeModal }}>{children}</ModalContext.Provider>;
}
