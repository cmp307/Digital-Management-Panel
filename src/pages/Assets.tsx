import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/Assets.scss';
import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Table from '../components/Table';
import { useEffect, useState } from "react";
import { getAssetsFromDatabase } from "../Database";

const tablePlaceholder = (
    <div className='table-placeholder'>
        <TextBlock rows={3} color='#CDCDCD' />
    </div>
);
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function Assets() {
    const [data, setData] = useState([] as any[]);

    // useEffect(() => {
    //     getAssetsFromDatabase().then((data) => {
    //         console.log(data);
    //         setData(data as any[]);
    //     });
    // });

    return (
        <>
            <TopBar subtext="Asset Management Panel" />
            <Breadcrumbs path="Assets" />
            <h2 className="text-centre">Action Buttons</h2>
            <div id="action-buttons">
                <button id="create-asset" className="btn"><i className="fa fa-plus" /> Create an Asset</button>
                <button id="delete-all-assets" className="btn danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Assets</button>
            </div>
            <hr />
            <h2 className="text-centre">Asset List</h2>
            <p className="text-centre">There {(data.length > 1) ? 'are' : 'is'} currently <strong>{data.length} {(data.length > 1 || data.length == 0) ? 'assets' : 'asset'}</strong> stored within the Database.</p>
            <Table data={data} />

        </>
    )
}

export default Assets;