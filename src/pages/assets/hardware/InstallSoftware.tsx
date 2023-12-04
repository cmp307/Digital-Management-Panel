import TopBar from "../../../components/TopBar";
import '../../../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../../../interfaces/Employee";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { SoftwareAsset } from "../../../components/assets/software/SoftwareAsset";

class InstallSoftware extends Component<{ setUser: Function, user: IEmployee, navigate: NavigateFunction, id: string }, { data: SoftwareAsset[], setUser: Function, user: IEmployee, form_data: any }> {
    private _id: string;
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            setUser: props.setUser,
            user: props.user,
            form_data: {}
        }
        this._id = props.id;
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3001/api/assets/software/view-all')
            .then((res) => res.json())
            .then((res) => res.map((x: any) => new SoftwareAsset(x)))
            .then((res) => this.setState({ data: res }))
            .catch((err) => console.error(err))
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        const { softwareAsset } = this.state.form_data;

        const data = {
            software_id: softwareAsset,
            hardware_id: this._id,
            date: new Date().toISOString(),
            created_by: this.props.user.email
        }
        fetch('http://127.0.0.1:3001/api/asset-link/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(() => {
            this.props.navigate(`/hardware/${this._id}`)
        })
        return false;
    }

    handleChange(key: string, value: any) {
        const curr = this.state.form_data;
        this.setState({ form_data: { ...curr, [key]: value } });
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Hardware Assets', path: '/hardware' },
                    { name: this._id, path: `/hardware/${this._id}` },
                    { name: 'Link Software', path: `/hardware/${this._id}/install` },
                ]} setUser={this.state.setUser} user={this.state.user} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-cloud-download" /> Link a Software Asset</h2>
                    <hr />
                </div>

                <form id="asset-form" onSubmit={this.onSubmit}>
                    <label><i className="fa fa-user" /> What Software Asset do you want to link this asset to? <span className="red-star">*</span></label>
                    <select name="software_asset" id="software_asset" onChange={e => this.handleChange('softwareAsset', e.target.value)} required>
                        <option disabled selected value=''>[Please select a Software Asset to link]</option>
                        {this.state.data ? this.state.data.map((x) => {
                            return <option value={x._id.toString()}>{x.name} ({x.version})</option>
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
    const { id } = useParams();
    const navigation = useNavigate();

    if (!id) throw new Error(`Invalid ID for Software. Given: ${id}`);

    return <InstallSoftware {...props} navigate={navigation} id={id} />
};