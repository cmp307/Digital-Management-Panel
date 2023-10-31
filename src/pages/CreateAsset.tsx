import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";

function CreateAssets() {
    const [name, setName] = useState(undefined as any);
    const [type, setType] = useState(undefined as any);
    const [managerName, setManagerName] = useState(undefined as any);
    const [managerID, setManagerID] = useState(0 as any);

    function sendAssetForm() {
        fetch('http://127.0.0.1:3001/api/assets/create', {
            method: 'POST',
            body: JSON.stringify({
                name,
                type,
                managerBy: {
                    name: managerName,
                    uid: managerID
                }
            })
        })
    }


    return (
        <>
            <TopBar subtext="Asset Management Panel" />
            <Breadcrumbs data={[
                { name: 'Home', path: '/' },
                { name: 'Assets', path: '/assets' },
                { name: 'Create', path: '/assets/create' },
            ]} />
            <h2 className="text-centre">Create an Asset</h2>

            <form id="create-asset" onSubmit={sendAssetForm}>
                <div id="question">
                    <label htmlFor="name">Asset Name</label><br />
                    <input type="text" id="name" placeholder="Please enter the name for your Asset." onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div id="question">
                    <label htmlFor="type">Asset Type</label><br />
                    <input type="text" id="type" placeholder="Please enter the type of the Asset." onChange={(e) => setType(e.target.value)}></input>
                </div>
                <div id="question">
                    <label htmlFor="type">Manager Name</label><br />
                    <input type="text" id="type" placeholder="Please enter the name of the Asset Manager." onChange={(e) => setManagerName(e.target.value)}></input>
                </div>
                <div id="question">
                    <label htmlFor="type">Manager ID</label><br />
                    <input type="text" id="type" placeholder="Please enter the ID of the Asset Manager." onChange={(e) => setManagerID(e.target.value)}></input>
                </div>

                <br />

                <input type="submit"></input>
            </form>
        </>
    )
}

export default CreateAssets;