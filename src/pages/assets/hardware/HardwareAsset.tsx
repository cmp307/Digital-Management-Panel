// import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../../../components/TopBar";
import '../../../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { HardwareAsset as CHardwareAsset } from "../../../components/assets/hardware/HardwareAsset";
import { IEmployee } from "../../../interfaces/Employee";
import Breadcrumbs from "../../../components/Breadcrumbs";
import HardwareAssetInfoTable from "../../../components/assets/hardware/HardwareAssetInfoTable";
import { SoftwareAsset } from "../../../components/assets/software/SoftwareAsset";
import SoftwareLinkTable from "../../../components/assets/software/SoftwareLinkTable";

class HardwareAsset extends Component<{ setUser: Function, user: IEmployee, id: string, navigate: NavigateFunction }, { hardware_data?: CHardwareAsset, software_data?: { software: SoftwareAsset, link: any }[], setUser: Function, user: IEmployee }> {
    private _id: string;
    constructor(props: any) {
        super(props)
        this.state = {
            hardware_data: undefined,
            software_data: [],
            setUser: props.setUser,
            user: props.user
        }
        this._id = props.id
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:3001/api/assets/hardware/${this._id}`)
            .then((res) => res.json())
            .then((res) => new CHardwareAsset(res))
            .then((res) => this.setState({ hardware_data: res }))
            .catch((err) => console.error(err))

        fetch(`http://127.0.0.1:3001/api/asset-link/hardware/${this._id}/get-all`)
            .then((res) => res.json())
            .then((res) => res.map((x: any) => { return { software: new SoftwareAsset(x.software), link: x.link } }))
            .then((res) => this.setState({ software_data: [...res] }))
            .catch((err) => console.error(err))
    }

    delete() {
        fetch(`http://127.0.0.1:3001/api/assets/hardware/${this._id}`, { method: 'DELETE' }).then(() => {
            this.props.navigate('/hardware');
        })
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        console.log(this.state.software_data);
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Hardware Assets', path: '/hardware' },
                    { name: this._id ?? '-', path: `/hardware/${this._id}` },
                ]} setUser={this.props.setUser} username={this.props.user.email} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-terminal" /> Action Buttons</h2>
                    <hr />
                </div>
                <div id="action-buttons">
                    <Link to={`/hardware/${this._id}/install`} className="btn btn-outline-primary"><i className="fa fa-cloud-download" /> Link Software</Link>
                    <Link to={`/hardware/${this._id}/edit`} className="btn btn-outline-primary"><i className="fa fa-edit" /> Edit Asset</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Asset</button>
                    <button onClick={this.delete} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete Asset</button>
                </div>
                <div className="hero">
                    <hr />
                    <h2 className="text-centre"><i className="fa fa-server" /> Hardware Asset Information</h2>
                    <hr />
                </div>
                {this.state.hardware_data ?
                    <div id="centred-div">
                        <HardwareAssetInfoTable asset={this.state.hardware_data} />
                    </div> :
                    <p className="text-centre">Loading...</p>
                }

                {this.state.software_data && this.state.software_data.length > 0 ?
                    <div className="text-centre">
                        <div className="hero">
                            <hr />
                            <h2 className="text-centre"><i className="fa fa-cloud-download" /> Linked Software Assets</h2>
                            <hr />
                        </div>
                        <div>
                            <SoftwareLinkTable assets={this.state.software_data} id={this.props.id} />
                            <button className="btn btn-outline-primary" onClick={() => this.props.navigate(-1)}>Return to previous page!</button>
                        </div>
                        <br />
                    </div> : <></>}

            </>
        )
    }


}

export default ({ setUser, user }: { setUser: Function, user: IEmployee }) => {
    const { id } = useParams();
    const navigation = useNavigate();
    if (!id) throw new Error(`Invalid ID for Employee. Given: ${id}`);

    return <HardwareAsset setUser={setUser} user={user} id={id} navigate={navigation} />
};