import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

function Home() {
    return (
        <>
            <TopBar />
            <div className="container py-4 px-3 mx-auto">
                <div className="text-center">
                    <Link to="/assets" className="btn btn-outline-primary" role="button">View &amp; Manage Assets</Link>
                    <br/><br/>
                    <Link to="/employees" className="btn btn-outline-primary disabled" role="button">View &amp; Manage Employees</Link>
                </div>
            </div>
        </>
    )
}

export default Home;