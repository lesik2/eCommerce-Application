import Alert, { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

interface FetchResultAlertProps {
    message: string;
    severity: AlertColor;
    isOpen: boolean;
    onChange: () => void;
}

function FetchResultAlert(props: FetchResultAlertProps) {
    const { message, severity, isOpen, onChange } = props;
    return (
        <Collapse in={isOpen}>
            <Alert
                severity={severity}
                className="mt-4"
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={onChange}>
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
