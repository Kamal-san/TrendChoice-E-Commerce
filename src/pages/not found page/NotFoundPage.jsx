import { Header } from "../../shared-components/Header";
import './NotFoundPage.css';

export function NotFoundPage({cart})
{
    return(
        <>
        <title>404 Page Not Found</title>
        <link rel="icon" type="image/svg+xml" href="home-favicon.png"></link>
        <Header cart={cart}/>
        <div className="not-found-message">
            Page Not Found
        </div>
        </>
    );
}