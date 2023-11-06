import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AssetInfoTable from "../components/AssetInfoTable";

function Asset() {
    const { id } = useParams();
    const [data, setData] = useState(undefined as any);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/api/asset/${id}`)
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error(err))
    }, []);
    console.log(data);

    return (
        <>
            <TopBar heading="Asset Management Panel" />
            <Breadcrumbs history={[
                { name: 'Home', path: '/' },
                { name: 'Assets', path: '/assets' },
                { name: id ?? '-', path: `/assets/${id}` },
            ]} />
            <h2 className="text-centre">Action Buttons</h2>
            <div id="action-buttons">
                <Link to={'/assets/create'} className="btn btn-outline-primary disabled"><i className="fa fa-edit" /> Edit Asset</Link>
                <button onClick={refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Asset</button>
                <button onClick={deleteAllAssets} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete Asset</button>
            </div>
            <hr />
            <h2 className="text-centre">Full Asset Information</h2>
            <hr />
            <div id="centred-div">
                {data ? <AssetInfoTable asset={data} /> : 'Loading...'}
                <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Return to previous page!</button>
                <br /><br />
            </div>

        </>
    )
}

function deleteAllAssets() {
    fetch('http://127.0.0.1:3001/api/delete-all-assets', { method: 'DELETE' }).then(() => {
        refreshPage();
    })
}

function refreshPage() {
    window.location.reload();
}

export default Asset;