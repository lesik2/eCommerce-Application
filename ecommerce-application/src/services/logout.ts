import handleFlows from './handleFlows';

export default function logout() {
    localStorage.clear();
    handleFlows();
}
