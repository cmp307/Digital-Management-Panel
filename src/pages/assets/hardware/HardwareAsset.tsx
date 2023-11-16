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
import SoftwareAssetTable from "../../../components/assets/software/SoftwareAssetTable";
import { SoftwareAsset } from "../../../components/assets/software/SoftwareAsset";

class HardwareAsset extends Component<{ setUser: Function, user: IEmployee, id: string, navigate: NavigateFunction }, { hardware_data?: CHardwareAsset, software_data?: SoftwareAsset[], setUser: Function, user: IEmployee }> {
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
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:3001/api/assets/hardware/${this._id}`)
            .then((res) => res.json())
            .then((res) => new CHardwareAsset(res))
            .then((res) => this.setState({ hardware_data: res }))
            .catch((err) => console.error(err))

        fetch(`http://127.0.0.1:3001/api/assets/software/view-all/${this._id}`)
            .then((res) => res.json())
            .then((res) => res.map((x: any) => new SoftwareAsset(x)))
            .then((res) => this.setState({ software_data: [...res] }))
            .catch((err) => console.error(err))
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
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Assets', path: '/assets' },
                    { name: this._id ?? '-', path: `/assets/${this._id}` },
                ]} setUser={this.props.setUser} username={this.props.user.email} />

                <h2 className="text-centre">Action Buttons</h2>
                <div id="action-buttons">
                    <Link to={`/edit/assets/${this._id}`} className="btn btn-outline-primary"><i className="fa fa-edit" /> Edit Asset</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Asset</button>
                    <button onClick={this.delete} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete Asset</button>
                </div>
                <hr />
                <h2 className="text-centre">Hardware Asset Information</h2>
                <hr />
                {this.state.hardware_data ?
                    <div id="centred-div">
                        <HardwareAssetInfoTable asset={this.state.hardware_data} />
                    </div> :
                    <p>Loading...</p>
                }
                <hr />
                <h2 className="text-centre">Linked Software Assets</h2>
                <hr />
                <div>
                    {this.state.software_data ? <SoftwareAssetTable assets={this.state.software_data} /> : 'Loading...'}
                    <div className="text-centre">
                        <button className="btn btn-outline-primary" onClick={() => this.props.navigate(-1)}>Return to previous page!</button>
                    </div>
                    <br />
                </div>

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