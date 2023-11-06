import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function CreateAssets() {
    const [data, setData] = useState([] as any[]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/employees')
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
                { name: 'Create', path: '/assets/create' },
            ]} />
            <h2 className="text-centre">Create an Asset</h2>

            <form id="create-asset" method="get" action="http://localhost:3001/api/assets/create" onSubmit={async () => { await delay(1000); navigate('/assets') }}>
                <div id="question">
                    <label htmlFor="name">Asset Name</label><br />
                    <input type="text" id="name" name="name" placeholder="Please enter the name for your Asset."></input>
                </div>
                <div id="question">
                    <label htmlFor="type">Asset Type</label><br />
                    <input type="text" id="type" name="type" placeholder="Please enter the type of the Asset."></input>
                </div>

                <div id="question">
                    <label htmlFor="type">Asset Model</label><br />
                    <input type="text" id="type" name="model" placeholder="Please enter the Model of the Asset."></input>
                </div>

                <div id="question">
                    <label htmlFor="type">Asset Manufacturer</label><br />
                    <input type="text" id="type" name="manufacturer" placeholder="Please enter the Manufacturer of the Asset."></input>
                </div>


                <div id="question">
                    <label htmlFor="type">IP Address</label><br />
                    <input type="text" id="type" name="ip" placeholder="Please enter the IP Address of the Asset."></input>
                </div>

                <div id="question">
                    <label htmlFor="type">Purchase Date</label><br />
                    <input type="text" id="type" name="date" placeholder="Please enter the Purchase Date of the Asset."></input>
                </div>

                <div id="question">
                    <label htmlFor="type">Note</label><br />
                    <input type="text" id="type" name="note" placeholder="Would you like to leave a note on this asset?"></input>
                </div>

                <label>What employee do you want to assign this asset to?</label>
                <select name="employee" id="employee">
                    <option value="1">(1) John S.</option>
                    <option value="2">(2) Steve E.</option>
                    <option value="3">(3) Mick B.</option>
                    <option value="4">(4) Leon F.</option>
                </select>

                {/* <div id="question">
                    <label htmlFor="type">Manager Name</label><br />
                    <input type="text" id="type" name="manager" placeholder="Please enter the name of the Asset Manager."></input>
                </div>
                <div id="question">
                    <label htmlFor="type">Manager ID</label><br />
                    <input type="text" id="type" name="uid" placeholder="Please enter the ID of the Asset Manager."></input>
                </div> */}

                <br />

                <input type="submit"></input>
            </form>
        </>
    )
}

export default CreateAssets;