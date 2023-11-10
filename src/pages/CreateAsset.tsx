import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function CreateAssets() {
    // const [data, setData] = useState([] as any[]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     fetch('http://127.0.0.1:3001/api/employees')
    //         .then((res) => res.json())
    //         .then((res) => setData(res))
    //         .catch((err) => console.error(err))
    // }, []);

    // console.log(data);

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
                    <label htmlFor="name"><i className="fa fa-pencil-square-o" /> Asset Name</label><br />
                    <input type="text" id="name" name="name" placeholder="Please enter the name for your Asset." required></input>
                </div>
                <div id="question">
                    <label htmlFor="type"><i className="fa fa-exchange" /> Asset Type</label><br />
                    <select name="type" id="type" required>
                        <option disabled selected value=''> = Please select a type for your Asset. = </option>
                        {[
                            'CCTV Camera',
                            'Workstation',
                            'Laptop',
                            'Mobile Phone',
                            'Server',
                            'Firewall',
                            'Router',
                            'Switch'
                        ]
                            .map(x => { return <option value={x}>{x}</option> })}
                    </select>
                </div>

                <div id="question">
                    <label htmlFor="model"><i className="fa fa-list-alt" /> Asset Model</label><br />
                    <input type="text" id="model" name="model" placeholder="Please enter the Model of the Asset."></input>
                </div>

                <div id="question">
                    <label htmlFor="manufacturer"><i className="fa fa-cogs" /> Asset Manufacturer</label><br />
                    <input type="text" id="manufacturer" name="manufacturer" placeholder="Please enter the Manufacturer of the Asset."></input>
                </div>


                <div id="question">
                    <label htmlFor="ip"><i className="fa fa-wifi" /> IP Address</label><br />
                    <input type="text" id="ip" name="ip" placeholder="Please enter the IP Address of the Asset." required></input>
                </div>

                <div id="question">
                    <label htmlFor="date"><i className="fa fa-calendar" /> Purchase Date</label><br />
                    <input type="date" id="date" name="date" placeholder="Please enter the Purchase Date of the Asset."></input>
                </div>

                <div id="question">
                    <label htmlFor="note"><i className="fa fa-sticky-note-o" /> Note</label><br />
                    <textarea id="note" name="note" placeholder="Would you like to leave a note on this asset?"></textarea>
                </div>

                <label><i className="fa fa-user" /> What employee do you want to assign this asset to?</label>
                <select name="employee" id="employee" required>
                    <option disabled selected value=''> = Please select an employee to assign this asset to. = </option>
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