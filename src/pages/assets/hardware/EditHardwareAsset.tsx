import TopBar from "../../../components/TopBar";
import '../../../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../../../interfaces/Employee";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { HardwareAsset } from "../../../components/assets/hardware/HardwareAsset";

class EditHardwareAsset extends Component<{ setUser: Function, user: IEmployee, id: string, navigate: NavigateFunction }, { asset_data?: HardwareAsset, employee_data?: IEmployee[], setUser: Function, user: IEmployee, form_data: any }> {
    private _id: string;
    constructor(props: any) {
        super(props);
        this._id = props.id;
        this.state = {
            asset_data: undefined,
            employee_data: undefined,
            setUser: props.setUser,
            user: props.user,
            form_data: {}
        }
        this.render = this.render.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:3001/api/assets/hardware//${this._id}`)
            .then((res) => res.json())
            .then((res) => new HardwareAsset(res))
            .then((res) => this.setState({ asset_data: res, form_data: res }))
            .then((res) => console.log(res))
            .catch((err) => console.error(err))

        fetch('http://127.0.0.1:3001/api/employees/')
            .then((res) => res.json())
            .then((res) => this.setState({ employee_data: res }))
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }

    handleChange(key: string, value: any) {
        const curr = this.state.form_data;
        this.setState({ form_data: { ...curr, [key]: value } });
        console.log(this.state.form_data);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        console.log('FORM DATA = ', this.state.form_data);
        fetch(`http://127.0.0.1:3001/api/assets/hardware/${this._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.form_data)
        }).then(() => {
            this.props.navigate(`/hardware/${this._id}`);
        })
        return false;
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Hardware Assets', path: '/hardware' },
                    { name: this.props.id, path: `/hardware/${this._id}` },
                    { name: 'Edit', path: `/hardware/${this._id}/edit` },
                ]} setUser={this.state.setUser} user={this.state.user} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-server" />Edit a Hardware Asset</h2>
                    <hr />
                </div>

                <p className="text-centre"><i className="fa fa-id-card-o" /> <strong>Asset ID</strong>: <code>{this._id}</code></p>
                {this.state.asset_data ?
                    <form id="asset-form" onSubmit={this.onSubmit}>
                        <div id="question">
                            <label htmlFor="name"><i className="fa fa-pencil-square-o" /> Asset ID</label><br />
                            <input
                                type="text"
                                id="_id"
                                name="_id"
                                value={this.state.form_data?._id.toString() ?? undefined}
                                required
                                disabled></input>
                        </div>
                        <div id="question">
                            <label htmlFor="name"><i className="fa fa-pencil-square-o" /> Asset Name<span className="red-star">*</span></label><br />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.form_data?.name ?? undefined}
                                onChange={e => this.handleChange('name', e.target.value)}
                                placeholder="Please enter the name for your Asset."
                                required></input>
                        </div>
                        <div id="question">
                            <label htmlFor="type"><i className="fa fa-exchange" /> Asset Type<span className="red-star">*</span></label><br />
                            <select onChange={e => this.handleChange('type', e.target.value)} name="type" id="type" required>
                                {(this.state.form_data.type ?
                                    <option disabled selected value=''>[Please select a type for your Asset]</option> :
                                    <option disabled value=''>[Please select a type for your Asset]</option>
                                )}
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
                                    .map((x) => {
                                        if (x == this.state.form_data?.type) return <option selected value={x}>{x}</option>
                                        return <option value={x}>{x}</option>
                                    })}
                            </select>
                        </div>

                        <div id="question">
                            <label htmlFor="model"><i className="fa fa-list-alt" /> Asset Model</label><br />
                            <input type="text" id="model" name="model" onChange={e => this.handleChange('model', e.target.value)} value={this.state.form_data.model ?? undefined} placeholder="Please enter the Model of the Asset."></input>
                        </div>

                        <div id="question">
                            <label htmlFor="manufacturer"><i className="fa fa-cogs" /> Asset Manufacturer</label><br />
                            <input type="text" id="manufacturer" name="manufacturer" onChange={e => this.handleChange('manufacturer', e.target.value)} value={this.state.form_data.manufacturer ?? undefined} placeholder="Please enter the Manufacturer of the Asset."></input>
                        </div>


                        <div id="question">
                            <label htmlFor="ip"><i className="fa fa-wifi" /> IP Address (<code>IPv4/IPv6</code>)<span className="red-star">*</span></label><br />
                            <input
                                type="text"
                                id="ip"
                                name="ip"
                                placeholder="Please enter the IP Address of the Asset."
                                onChange={e => this.handleChange('ip', e.target.value)}
                                value={this.state.form_data.ip ?? undefined}
                                // RegEx Tester (2023) 'Validate IPv4 and IPv6 Address', Available at: https://www.regextester.com/104038 (Accessed: Dec 03, 2023).
                                pattern="\b(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b|\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b"
                                required></input>
                        </div>

                        <div id="question">
                            <label htmlFor="date"><i className="fa fa-calendar" /> Purchase Date</label><br />
                            <input type="date" id="date" name="date" onChange={e => this.handleChange('date', e.target.value)} value={this.state.form_data.date} placeholder="Please enter the Purchase Date of the Asset."></input>
                        </div>

                        <div id="question">
                            <label htmlFor="note"><i className="fa fa-sticky-note-o" /> Note</label><br />
                            <textarea id="note" name="note" value={this.state.form_data.note} onChange={e => this.handleChange('note', e.target.value)} placeholder="Would you like to leave a note on this asset?"></textarea>
                        </div>

                        <label><i className="fa fa-user" /> What employee do you want to assign this asset to?<span className="red-star">*</span></label>
                        <select name="parent_employee" onChange={e => this.handleChange('parent_employee', e.target.value)} id="parent_employee" required>
                            {(this.state.form_data.parent_employee) ?
                                <option disabled value=''>[Please select an employee to assign this asset to]</option> :
                                <option disabled selected value=''>[Please select an employee to assign this asset to]</option>}
                            {this.state.employee_data ? this.state.employee_data.map((x) => {
                                if ((this.state.asset_data?.parent_employee && (x._id.toString() == this.state.asset_data.parent_employee.toString()))) return <option selected value={x._id.toString()}>{x.forename} {x.surname} ({x.department})</option>
                                return <option value={x._id.toString()}>{x.forename} {x.surname} ({x.department})</option>
                            }) : 'Loading...'}
                        </select>

                        <br />

                        <input type="submit"></input>
                        <button className="cancel" type="button" onClick={() => this.props.navigate(-1)}>Cancel</button>
                    </form >
                    : <p className="text-centre">Loading...</p>
                }
            </>
        )
    }
}

export default (props: any) => {
    const { id } = useParams();
    if (!id) throw new Error(`EditAsset: Invalid ID for Asset. Given: ${id}`);

    const navigation = useNavigate();
    return <EditHardwareAsset {...props} navigate={navigation} id={id} />
};