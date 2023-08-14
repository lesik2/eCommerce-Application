import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    let errorMessage = 'Unknown error';

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText;
    }
    return (
        <div className="text-center">
            <h1 className="py-2 text-2xl text-center">Error page</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}
