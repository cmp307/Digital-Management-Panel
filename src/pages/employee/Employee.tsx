import TopBar from "../../components/TopBar.tsx";
import '../../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IEmployee } from '../../interfaces/Employee.ts';
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import { HardwareAsset } from "../../components/assets/hardware/HardwareAsset.ts";
import HardwareAssetTable from "../../components/assets/hardware/HardwareAssetTable.tsx";

class Employee extends Component<{ setUser: Function, user: IEmployee, id: string, navigate:NavigateFunction }, { employee_data?: IEmployee, asset_data?: HardwareAsset[], setUser: Function, user: IEmployee }> {
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
        fetch(`http://127.0.0.1:3001/api/employees/${this._id}`)
            .then((res) => res.json())
            .then((res) => this.setState({ employee_data: res }))
            .catch((err) => {
                console.error(err)
            })

        fetch(`http://127.0.0.1:3001/api/assets/hardware/view-all/${this._id}`)
            .then((res) => res.json())
            .then((res) => res.map((x: any) => { return new HardwareAsset(x) }))
            .then((res) => { console.log(res); return res })
            .then((res) => this.setState({ asset_data: res }))
            .catch((err) => {
                console.error(err)
            })
    }

    delete() {
        fetch(`http://127.0.0.1:3001/api/employees/${this._id}`, { method: 'DELETE' }).then(() => {
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
                    <Link to={`/employees/${this._id}/edit`} className="btn btn-outline-primary"><i className="fa fa-edit" /> Edit Employee</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Employee</button>
                    <button onClick={this.delete} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Employee Assets</button>
                </div>
                <hr />
                <div className="text-centre">
                    {this.state.employee_data == undefined ? 'Loading...' : <>
                        <h2 className="text-centre">Employee's Personal Data</h2>
                        <p>Forename: <code>{this.state.employee_data.forename}</code></p>
                        <p>Surname: <code>{this.state.employee_data.surname}</code></p>
                        <p>E-Mail: <code>{this.state.employee_data.email}</code></p>
                        <p>Department: <code>{this.state.employee_data.department}</code></p>
                    </>}
                </div>
                <hr />
                <h2 className="text-centre">Asset List</h2>
                {this.state.asset_data ? <><p className="text-centre">This employee currently has <strong>{this.state.asset_data.length} {(this.state.asset_data.length > 1 || this.state.asset_data.length == 0) ? 'assets' : 'asset'}</strong> assigned to them.</p>
                    <HardwareAssetTable assets={this.state.asset_data} /></> : <p className="text-centre">Loading...</p>}
                <div id="centred-div">
                <button className="btn btn-outline-primary" onClick={() => this.props.navigate(-1)}>Return to previous page!</button>
                </div>
            </>
        )
    }
}

export default ({ setUser, user }: { setUser: Function, user: IEmployee }) => {
    const { id } = useParams();
    const navigation = useNavigate();

    if (!id) throw new Error(`Invalid ID for Employee. Given: ${id}`);
    return <Employee setUser={setUser} user={user} id={id} navigate={navigation} />
};