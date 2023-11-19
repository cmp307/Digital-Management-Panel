import Breadcrumbs from "../../../components/Breadcrumbs.tsx";
import TopBar from "../../../components/TopBar.tsx";
import '../../../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Link } from "react-router-dom";
import { Component } from 'react';
import { IEmployee } from "../../../interfaces/Employee.ts";
import { HardwareAsset } from "../../../components/assets/hardware/HardwareAsset.ts";
import HardwareAssetTable from "../../../components/assets/hardware/HardwareAssetTable.tsx";

class HardwareAssets extends Component<{ setUser: Function, user: IEmployee }, { hardware_data: HardwareAsset[], user: IEmployee, setUser: Function }> {
    constructor(props: any) {
        super(props);
        this.state = {
            hardware_data: [],
            user: props.user,
            setUser: props.setUser
        }
        this.updateAssets = this.updateAssets.bind(this);
        this.deleteAllAssets = this.deleteAllAssets.bind(this);
    }

    componentDidMount() { this.updateAssets() }
    // componentDidUpdate() { this.updateAssets() }

    updateAssets() {
        fetch('http://127.0.0.1:3001/api/assets/hardware/view-all')
            .then((res) => res.json())
            .then((res) => {
                this.setState({ hardware_data: [...res.map((x: any) => new HardwareAsset(x))] })
            })
            .catch((err) => console.error(err))
    }

    deleteAllAssets() {
        fetch('http://127.0.0.1:3001/api/assets/hardware/delete-all', { method: 'DELETE' }).then(() => {
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
                    { name: 'Hardware Assets', path: '/hardware' },
                ]} setUser={this.props.setUser} username={this.props.user.email} />

                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-terminal" /> Action Buttons</h2>
                    <hr />
                </div>

                <div id="action-buttons">
                    <Link to={'/hardware/create'} className="btn btn-outline-success"><i className="fa fa-plus" /> Create a Hardware Asset</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh List</button>
                    <button onClick={this.deleteAllAssets} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Hardware Assets</button>
                </div>

                <div className="hero">
                    <hr />
                    <h2 className="text-centre"><i className="fa fa-server" /> Hardware Asset List</h2>
                    <hr />
                </div>

                <p className="text-centre">There is currently <strong>{this.state.hardware_data.length}</strong> hardware {(this.state.hardware_data.length > 1 || this.state.hardware_data.length == 0) ? 'assets' : 'asset'} stored within the Database.</p>
                <HardwareAssetTable assets={this.state.hardware_data} />
            </>
        )
    }
}

export default HardwareAssets;