import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import Table from '../components/AssetTable.tsx';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Assets() {
    const [data, setData] = useState([] as any[]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/assets')
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error(err))
    }, []);

    return (
        <>
            <TopBar subtext="Asset Management Panel" />
            <Breadcrumbs history={[
                { name: 'Home', path: '/' },
                { name: 'Assets', path: '/assets' },
            ]} />
            <h2 className="text-centre">Action Buttons</h2>
            <div id="action-buttons">
                <Link to={'/assets/create'} className="btn btn-outline-primary"><i className="fa fa-plus" /> Create an Asset</Link>
                <button onClick={refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh List</button>
                <button onClick={deleteAllAssets} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Assets</button>
            </div>
            <hr />
            <h2 className="text-centre">Asset List</h2>
            <p className="text-centre">There {(data.length > 1) ? 'are' : 'is'} currently <strong>{data.length} {(data.length > 1 || data.length == 0) ? 'assets' : 'asset'}</strong> stored within the Database.</p>
            <Table assets={data} />
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

export default Assets;