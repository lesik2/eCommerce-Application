/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
    return (
        <>
            <div className="fixed bg-black/0 top-0 right-0 left-0 bottom-0 z-0" onClick={onClose} />
            {children}
        </>
    );
}
