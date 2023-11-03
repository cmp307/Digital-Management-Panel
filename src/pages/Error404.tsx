import TopBar from "../components/TopBar";
import { useNavigate } from 'react-router-dom';

function Error404() {
    const navigate = useNavigate();

    return (
        <div>
            <TopBar />
            <br />
            <div className="text-centre">
                <h1>Error 404 😔</h1>
                <p>You have navigated to an unreachable link! This resource is not available.</p>
                <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Return to previous page!</button>
            </div>
        </div>
    )
}

export default Error404;