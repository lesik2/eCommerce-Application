import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

function Root() {
    return (
        <main className="grid grid-rows-[auto_1fr_auto] md:grid-rows-[auto_70px_1fr_auto] mx-auto h-screen">
            <Header />
            <Outlet />

            <Footer />
        </main>
    );
}

export default Root;
