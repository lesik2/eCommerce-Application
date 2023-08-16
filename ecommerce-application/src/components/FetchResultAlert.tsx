import Alert, { AlertColor } from '@mui/material/Alert';

type FetchResultAlertProps = {
    message: string;
    severity: AlertColor;
};

function FetchResultAlert({ message, severity }: FetchResultAlertProps) {
    return <Alert severity={severity}>{message}</Alert>;
}

export default FetchResultAlert;
