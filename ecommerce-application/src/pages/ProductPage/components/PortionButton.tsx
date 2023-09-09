import Button from '@mui/material/Button';

type PortionButtonProps = {
    name: string;
    active: boolean;
    onClick: () => void;
};

export default function PortionButton({ name, active, onClick }: PortionButtonProps) {
    return (
        <Button
            sx={[
                {
                    '&&': {
                        textTransform: 'lowercase',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        fontFamily: 'Russo One',
                        fontWeight: '400',
                        color: active ? '#fff' : '#000',
                        borderRadius: '30px',
                        border: 'solid 1px #FF5757',
                        backgroundColor: active ? '#FF5757' : '#fff',
                    },
                },
            ]}
            variant="text"
            onClick={onClick}
        >
            {name}
        </Button>
    );
}
