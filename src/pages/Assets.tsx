import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import Table from '../components/AssetTable.tsx';
import { Link } from "react-router-dom";
import { Component } from 'react';
import { Employee } from "../interfaces/Employee.ts";
import { Asset } from "../interfaces/Asset.ts";

class Assets extends Component<{ setUser: Function, user: Employee }, { data: Asset[], user: Employee, setUser: Function }> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            user: props.user,
            setUser: props.setUser
        }
        this.updateAssets = this.updateAssets.bind(this);
    }

    componentDidMount() { this.updateAssets() }
    // componentDidUpdate() { this.updateAssets() }

    updateAssets() {
        fetch('http://127.0.0.1:3001/api/assets')
            .then((res) => res.json())
            .then((res) => {
                const _state: any = this.state;
                _state.data = [...res];
                this.setState(_state)
            })
            .catch((err) => console.error(err))
    }

    deleteAllAssets() {
        fetch('http://127.0.0.1:3001/api/delete-all-assets', { method: 'DELETE' }).then(() => {
            this.refreshPage();
        })
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        return (
            <>
                <TopBar heading="Asset Management Panel" />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Assets', path: '/assets' },
                ]} setUser={this.props.setUser} username={this.props.user.email} />
                <h2 className="text-centre">Action Buttons</h2>
                <div id="action-buttons">
                    <Link to={'/assets/create'} className="btn btn-outline-primary"><i className="fa fa-plus" /> Create an Asset</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh List</button>
                    <button onClick={this.deleteAllAssets} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Assets</button>
                </div>
                <hr />
                <h2 className="text-centre">Asset List</h2>
                <p className="text-centre">There is currently <strong>{this.state.data.length}</strong> {(this.state.data.length > 1 || this.state.data.length == 0) ? 'assets' : 'asset'} stored within the Database.</p>
                <Table assets={this.state.data} />
            </>
        )
    }
}

export default Assets;