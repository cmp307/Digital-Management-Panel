import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

function Home() {
    return (
        <>
            <div id="header">
                <img src="https://i.imgur.com/ZIL6Yos.png" className="img-fluid mx-auto d-block" />
                <h1>Scottish Glen</h1>
                <h3 className="header-2">Asset &amp; Employee Management Panel</h3>
            </div>
            <div className="container py-4 px-3 mx-auto">
                <div className="text-center">
                    <Link to="/assets" className="btn btn-outline-primary" role="button">View &amp; Manage Assets</Link>
                    <br/><br/>
                    <Link to="/employees" className="btn btn-outline-primary" role="button">View &amp; Manage Employees</Link>
                </div>
            </div>
        </>
    )
}

export default Home;