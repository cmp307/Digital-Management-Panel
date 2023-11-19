// import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../../../components/TopBar";
import '../../../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IEmployee } from "../../../interfaces/Employee";
import Breadcrumbs from "../../../components/Breadcrumbs";

// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class CreateAssets extends Component<{ setUser: Function, user: IEmployee, navigate: NavigateFunction }, { data: IEmployee[], setUser: Function, user: IEmployee }> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            setUser: props.setUser,
            user: props.user
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3001/api/employees/view-all')
            .then((res) => res.json())
            .then((res) => this.setState({ data: res }))
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Hardware Assets', path: '/hardware' },
                    { name: 'Create', path: '/hardware/create' },
                ]} setUser={this.state.setUser} username={this.state.user.email} />
                <h2 className="text-centre">Create an Asset</h2>

                <form id="asset-form" method="post" action="http://127.0.0.1:3001/api/assets/hardware" onSubmit={async () => { await delay(1000); this.props.navigate('/assets') }}>
                    <div id="question">
                        <label htmlFor="name"><i className="fa fa-pencil-square-o" /> Asset Name<span className="red-star">*</span></label><br />
                        <input type="text" id="name" name="name" placeholder="Please enter the name for your Asset." required></input>
                    </div>
                    <div id="question">
                        <label htmlFor="type"><i className="fa fa-exchange" /> Asset Type<span className="red-star">*</span></label><br />
                        <select name="type" id="type" required>
                            <option disabled selected value=''>[Please select a type for your Asset]</option>
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
                        <label htmlFor="ip"><i className="fa fa-wifi" /> IP Address (<code>IPv4/IPv6</code>)<span className="red-star">*</span></label><br />
                        <input
                            type="text"
                            id="ip"
                            name="ip"
                            placeholder="Please enter the IP Address of the Asset."
                            // regex source: https://www.regextester.com/104038
                            pattern="\b(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b|\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b"
                            required></input>
                    </div>

                    <div id="question">
                        <label htmlFor="date"><i className="fa fa-calendar" /> Purchase Date</label><br />
                        <input type="date" id="date" name="date" placeholder="Please enter the Purchase Date of the Asset."></input>
                    </div>

                    <div id="question">
                        <label htmlFor="note"><i className="fa fa-sticky-note-o" /> Note</label><br />
                        <textarea id="note" name="note" placeholder="Would you like to leave a note on this asset?"></textarea>
                    </div>

                    <label><i className="fa fa-user" /> What employee do you want to assign this asset to? <span className="red-star">*</span></label>
                    <select name="parent_employee" id="parent_employee" required>
                        <option disabled selected value=''>[Please select an employee to assign this asset to]</option>
                        {this.state.data ? this.state.data.map((x) => {
                            return <option value={x._id.toString()}>{x.forename} {x.surname} ({x.department})</option>
                        }) : 'Loading...'}
                    </select>

                    <br />

                    <input type="submit"></input>
                    <button className="cancel" type="button" onClick={() => this.props.navigate(-1)}>Cancel</button>
                </form>
            </>
        )
    }
}

export default (props: any) => {
    const navigation = useNavigate();
    return <CreateAssets {...props} navigate={navigation} />
};