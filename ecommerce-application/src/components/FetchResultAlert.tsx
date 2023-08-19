import { useState } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

type FetchResultAlertProps = {
    message: string;
    severity: AlertColor;
};

function FetchResultAlert({ message, severity }: FetchResultAlertProps) {
    const [open, setOpen] = useState(true);

    return (
        <Collapse in={open}>
            <Alert
                severity={severity}
                className="mt-4"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Collapse>
    );
}

export default FetchResultAlert;
