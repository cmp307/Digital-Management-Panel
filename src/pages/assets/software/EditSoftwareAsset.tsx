import TopBar from "../../../components/TopBar";
import '../../../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../../../interfaces/Employee";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { SoftwareAsset } from "../../../components/assets/software/SoftwareAsset";
import { HardwareAsset } from "../../../components/assets/hardware/HardwareAsset";
import Combobox from "react-widgets/Combobox";

class EditSoftwareAsset extends Component<{ setUser: Function, user: IEmployee, id: string, navigate: NavigateFunction }, { asset_data?: SoftwareAsset, employee_data?: IEmployee[], hardware_data?: HardwareAsset[], setUser: Function, user: IEmployee, form_data: any }> {
    private _id: string;
    constructor(props: any) {
        super(props);
        this._id = props.id;
        this.state = {
            asset_data: undefined,
            employee_data: undefined,
            hardware_data: undefined,
            setUser: props.setUser,
            user: props.user,
            form_data: {}
        }
        this.render = this.render.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:3001/api/assets/software/${this._id}`)
            .then((res) => res.json())
            .then((res) => new SoftwareAsset(res))
            .then((res) => this.setState({ asset_data: res, form_data: res }))
            .catch((err) => console.error(err))

        fetch('http://127.0.0.1:3001/api/employees/')
            .then((res) => res.json())
            .then((res) => this.setState({ employee_data: res }))
            .catch((err) => console.error(err))

        fetch('http://127.0.0.1:3001/api/assets/hardware/view-all')
            .then((res) => res.json())
            .then((res) => res.map((x: any) => new HardwareAsset(x)))
            .then((res) => this.setState({ hardware_data: res }))
            .catch((err) => console.error(err))
    }

    handleChange(key: string, value: any) {
        const curr = this.state.form_data;
        this.setState({ form_data: { ...curr, [key]: value } });
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:3001/api/assets/software/${this._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...this.state.form_data, created_at: this.state.asset_data?.created_at })
        }).then(() => {
            this.props.navigate(`/software/${this._id}`);
        })
        return false;
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Software Assets', path: '/software' },
                    { name: this.props.id, path: `/software/${this._id}` },
                    { name: 'Edit', path: `/software/${this._id}/edit` },
                ]} setUser={this.state.setUser} user={this.state.user} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-cloud-download" /> Edit a Software Asset</h2>
                    <hr />
                </div>
                <p className="text-centre"><i className="fa fa-id-card-o" /> <strong>Asset ID</strong>: <code>{this._id}</code></p>
                {this.state.asset_data && this.state.form_data ?
                    <form id="asset-form" onSubmit={this.onSubmit}>
                        <div id="question">
                            <label htmlFor="name"><i className="fa fa-pencil-square-o" /> Asset Name<span className="red-star">*</span></label><br />
                            <Combobox
                                id="name"
                                name="name"
                                defaultValue={this.state.form_data?.name}
                                onChange={e => this.handleChange('name', e)}
                                placeholder="Please enter the name for your Asset."
                                hideCaret
                                data={['Windows 10', 'Windows 11', 'Windows 8.1', 'Windows 7']} />
                        </div>
                        <div id="spacer"></div>
                        <div id="question">
                            <label htmlFor="manufacturer"><i className="fa fa-cogs" /> Asset Manufacturer</label><br />
                            <Combobox
                                id="name"
                                name="name"
                                defaultValue={this.state.form_data?.manufacturer}
                                onChange={e => this.handleChange('manufacturer', e)}
                                placeholder="Please enter the manufacturer for your Asset."
                                hideCaret
                                data={['Microsoft']} />
                        </div>
                        <div id="spacer"></div>

                        <div id="question">
                            <label htmlFor="version"><i className="fa fa-code-fork" /> Asset Version<span className="red-star">*</span></label><br />
                            <input
                                type="text"
                                id="version"
                                name="version"
                                value={this.state.form_data?.version ?? undefined}
                                onChange={e => this.handleChange('version', e.target.value)}
                                placeholder="Please enter the name for your Asset." required></input>
                        </div>

                        {(this.state.form_data.manufacturer && this.state.form_data.name && this.state.form_data.version) ?
                            <div id="question">
                                <label htmlFor="cpe"><i className="fa fa-tasks" /> Common Platform Enumeration</label><br />
                                <input
                                    type="text"
                                    id="cpe"
                                    name="cpe"
                                    value={(
                                        "cpe:2.3:o:" +
                                        this.state.form_data.manufacturer.toLowerCase() + ':' +
                                        this.state.form_data.name.toLowerCase().replace(' ', '_') + ":" +
                                        this.state.form_data.version
                                    )}
                                    onChange={e => this.handleChange('cpe', e.target.value)}
                                    required disabled></input>
                            </div> : <></>
                        }

                        <div id="question">
                            <label htmlFor="riskLevel"><i className="fa fa-exclamation-circle" /> Risk Level</label><br />
                            <p><strong>NOTE</strong>: It is recommended that you run a Vulnerability Scan instead of editing this field manually.</p>
                            <select value={this.state.form_data.riskLevel ?? undefined} onChange={e => this.handleChange('riskLevel', e.target.value)} name="riskLevel" id="riskLevel" required>
                                {(this.state.form_data.riskLevel || undefined) == undefined ? <option disabled selected>[It is recommended that you run a Vulnerability Scan instead of editing this field manually.]</option> : <></>}
                                {[
                                    'Critical',
                                    'High',
                                    'Medium',
                                    'Low',
                                    'N/A'
                                ]
                                    .map((x) => {
                                        if (x == this.state.form_data?.riskLevel) return <option selected value={x}>{x}</option>
                                        return <option value={x}>{x}</option>
                                    })}
                            </select>
                        </div>
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
    return <EditSoftwareAsset {...props} navigate={navigation} id={id} />
};