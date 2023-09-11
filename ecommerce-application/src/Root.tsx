import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

function Root() {
    return (
        <main className="flex flex-col justify-between mx-auto h-screen">
            <div>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </main>
    );
}

export default Root;
