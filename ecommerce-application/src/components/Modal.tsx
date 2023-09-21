/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Transition } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ANIM_TIME } from '../data/data';

/* eslint-disable jsx-a11y/click-events-have-key-events */
type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
    const { userMenuStatus, navMenuStatus, filterMenuStatus } = useContext(ModalContext);

    const [modalState, showModal] = useState(false);

    useEffect(() => {
        if (userMenuStatus || navMenuStatus || filterMenuStatus) {
            showModal(true);
        }

        if (!userMenuStatus && !navMenuStatus && !filterMenuStatus) {
            showModal(false);
        }
    }, [userMenuStatus, navMenuStatus, filterMenuStatus]);

    return (
        <>
            <Transition
                className="fixed bg-black/20 top-0 right-0 left-0 bottom-0 z-10"
                show={modalState}
                onClick={onClose}
                enter={`transition-all duration-${ANIM_TIME}`}
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave={`transition-all duration-${ANIM_TIME}`}
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            />
            {children}
        </>
    );
}
