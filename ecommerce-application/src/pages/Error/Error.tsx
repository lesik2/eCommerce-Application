import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import pic404 from '../../assets/img/pic404.svg';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import CustomizedButton from '../../components/ui/CustomizedButton';
import Image from '../../components/ui/Image';

enum ErrorCodes {
    'NOT_FOUND' = 404,
}

export default function ErrorPage() {
    const error = useRouteError();
    let errorMessage = 'Unknown error';
    let errorStatus = 0;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText;
        errorStatus = error.status;
    }
    return (
        <>
            <Header />
            <NavBar />
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-2xl text-center">Error page</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{errorMessage}</i>
                </p>
                {errorStatus === ErrorCodes.NOT_FOUND && <Image className="w-[120px]" image={pic404} alt="404" />}
                <Link className="py-10" to="/">
                    <CustomizedButton sx={{ fontSize: 15 }} variant="contained">
                        HOME
                    </CustomizedButton>
                </Link>
            </div>
        </>
    );
}
