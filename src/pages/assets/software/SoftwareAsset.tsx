// import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../../../components/TopBar";
import '../../../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { SoftwareAsset as CSoftwareAsset } from "../../../components/assets/software/SoftwareAsset";
import { IEmployee } from "../../../interfaces/Employee";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SoftwareAssetInfoTable from "../../../components/assets/software/SoftwareAssetInfoTable";
import HardwareLinkTable from "../../../components/assets/hardware/HardwareLinkTable";
import { HardwareAsset } from "../../../components/assets/hardware/HardwareAsset";

class SoftwareAsset extends Component<{ setUser: Function, user: IEmployee, id: string, navigate: NavigateFunction }, { setUser: Function, user: IEmployee, software_data?: CSoftwareAsset, hardware_data?: { hardware: HardwareAsset, link: any }[] }> {
    private _id: string;
    constructor(props: any) {
        super(props)
        this.state = {
            hardware_data: undefined,
            setUser: props.setUser,
            user: props.user,
            software_data: undefined
        }
        this._id = props.id
    }

    componentDidMount() {
        console.log(`fetching /assets/software/${this._id}`);
        fetch(`http://127.0.0.1:3001/api/assets/software/${this._id}`)
            .then((res) => res.json())
            .then((res) => new CSoftwareAsset(res))
            .then((res) => {
                this.setState({ software_data: res })
            })
            .catch((err) => console.error(err))

        console.log(`fetching /asset-link/software/${this._id}/get-all`);
        fetch(`http://127.0.0.1:3001/api/asset-link/software/${this._id}/get-all`)
            .then((res) => res.json())
            .then((res) => this.setState({ hardware_data: res }))
            .then((res) => console.log('fetched', res))
    }

    delete() {
        fetch(`http://127.0.0.1:3001/api/assets/hardware/${this._id}`, { method: 'DELETE' }).then(() => {
            this.refreshPage();
        })
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        console.log(this._id);
        console.log(this.state);
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Software Assets', path: '/software' },
                    { name: this._id ?? '-', path: `/software/${this._id}` },
                ]} setUser={this.props.setUser} username={this.props.user.email} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-terminal" /> Action Buttons</h2>
                    <hr />
                </div>
                <div id="action-buttons">
                    <Link to={`/software/${this._id}/scans`} role="button" id="blue-button" className="btn btn-outline-secondary disabled"><i className="fa fa-dot-circle-o" /> View Scans</Link>
                    {/* @TODO (NIST): Change below link to API request to start a scan. */}
                    <Link to={`/software/${this._id}/scan`} role="button" id="blue-button" className="btn btn-outline-secondary disabled"><i className="fa fa-wrench" /> Scan Asset</Link>                    <Link to={`/software/${this._id}/edit`} className="btn btn-outline-primary"><i className="fa fa-edit" /> Edit Asset</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Asset</button>
                    <button onClick={this.delete} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete Asset</button>
                </div>
                <div className="hero">
                    <hr />
                    <h2 className="text-centre"><i className="fa fa-cloud-download" /> Software Asset Information</h2>
                    <hr />
                </div>
                <div id="centred-div">
                    {this.state.software_data ? <SoftwareAssetInfoTable asset={this.state.software_data} /> : 'Loading...'}
                </div>

                {this.state.hardware_data && this.state.hardware_data.length > 0 ?
                    <div className="text-centre">
                        <div className="hero">
                            <hr />
                            <h2 className="text-centre"><i className="fa fa-server" /> Linked Hardware Assets</h2>
                            <hr />
                        </div>
                        <div>
                            <HardwareLinkTable assets={this.state.hardware_data} id={this.props.id} />
                        </div>
                    </div> : <></>}
                <div id="centred-div">
                    <button className="btn btn-outline-primary" onClick={() => this.props.navigate(-1)}>Return to previous page!</button>
                    <br />
                </div>
            </>
        )
    }


}

export default ({ setUser, user }: { setUser: Function, user: IEmployee }) => {
    const { id } = useParams();
    const navigation = useNavigate();
    if (!id) throw new Error(`Invalid ID for Software Asset. Given: ${id}`);

    return <SoftwareAsset setUser={setUser} user={user} id={id} navigate={navigation} />
};