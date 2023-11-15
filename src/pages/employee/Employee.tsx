import TopBar from "../../components/TopBar.tsx";
import '../../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import Table from '../../components/tables/AssetTable.tsx';
import { Component } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Asset } from "../../interfaces/Asset.ts";
import { Employee as IEmployee } from '../../interfaces/Employee.ts';
import Breadcrumbs from "../../components/Breadcrumbs.tsx";

class Employee extends Component<{ setUser: Function, user: IEmployee, id: string }, { employee_data?: IEmployee, asset_data?: Asset[], setUser: Function, user: IEmployee }> {
    private _id: string;
    constructor(props: any) {
        super(props);
        this.state = {
            employee_data: undefined,
            asset_data: undefined,
            setUser: props.setUser,
            user: props.user
        }
        this._id = props.id
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:3001/api/employee/${this._id}`)
            .then((res) => res.json())
            .then((res) => this.setState({ employee_data: res }))
            .catch((err) => {
                console.error(err)
            })

        fetch(`http://127.0.0.1:3001/api/employee/${this._id}/assets`)
            .then((res) => res.json())
            .then((res) => this.setState({ asset_data: res }))
            .catch((err) => {
                console.error(err)
            })
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
        console.log('employee state->', this.state)
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Employees', path: '/employees' },
                    { name: this._id ?? '-', path: `/employees/${this._id}` },
                ]} setUser={this.props.setUser} username={this.props.user.email} />
                <h2 className="text-centre">Action Buttons</h2>
                <div id="action-buttons">
                    <Link to={'/assets/create'} className="btn btn-outline-primary"><i className="fa fa-edit" /> Edit Employee</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Employee</button>
                    <button onClick={this.deleteAllAssets} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Employee Assets</button>
                </div>
                <hr />
                <div className="text-centre">
                    {this.state.employee_data == undefined ? 'Loading...' : <>
                        <h2 className="text-centre">{this.state.employee_data.name}'s Personal Data</h2>
                        <p>E-Mail: <code>{this.state.employee_data.email}</code></p>
                        <p>Department: <code>{this.state.employee_data.department}</code></p>
                    </>}
                </div>
                <hr />
                <h2 className="text-centre">Asset List</h2>
                {this.state.asset_data ? <><p className="text-centre">This employee currently has <strong>{this.state.asset_data.length} {(this.state.asset_data.length > 1 || this.state.asset_data.length == 0) ? 'assets' : 'asset'}</strong> assigned to them.</p>
                    <Table assets={this.state.asset_data} /></> : <p className="text-centre">Loading...</p>}

            </>
        )
    }
}

export default ({ setUser, user }: { setUser: Function, user: IEmployee }) => {
    const { id } = useParams();
    if (!id) throw new Error(`Invalid ID for Employee. Given: ${id}`);

    return <Employee setUser={setUser} user={user} id={id} />
};