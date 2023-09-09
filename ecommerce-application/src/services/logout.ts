import handleFlows from './handleFlows';

export default function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('status');
    localStorage.removeItem('idOfCustomer');
    handleFlows();
}
