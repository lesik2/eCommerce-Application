import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const CustomizedButton = styled(Button)`
    background-color: #ff5757;
    border-radius: 20px;
    padding: 3px 25px 3px 25px;
    &:hover {
        background-color: #bb0808;
    }
`;
export default CustomizedButton;
