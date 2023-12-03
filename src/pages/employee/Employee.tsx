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
import PillButton from "../../components/PillButton.tsx";

class Employee extends Component<{ setUser: Function, user: IEmployee, id: string, navigate: NavigateFunction }, { employee_data?: IEmployee, asset_data?: HardwareAsset[], setUser: Function, user: IEmployee }> {
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

        this.delete = this.delete.bind(this);
        this.deleteAssets = this.deleteAssets.bind(this);
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
            this.props.navigate('/employees')
        })
    }

    deleteAssets() {
        fetch(`http://127.0.0.1:3001/api/assets/hardware/delete-all/${this._id}`, { method: 'DELETE' }).then(() => {
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
                ]} setUser={this.props.setUser} user={this.props.user} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-terminal" /> Action Buttons</h2>
                    <hr />
                </div>
                <div id="action-buttons">
                    <Link to={`/employees/${this._id}/edit`} className={"btn btn-outline-primary " + (this._id == '655bf70f3ee93eb2c723dc9d' || this.state.employee_data?.email == this.props.user.email ? 'disabled' : '')}><i className="fa fa-edit" /> Edit Employee</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Employee</button>
                    <button onClick={this.deleteAssets} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Employee Assets</button>
                    <button onClick={this.delete} className={"btn btn-outline-danger " + (this._id == '655bf70f3ee93eb2c723dc9d' || this.state.employee_data?.email == this.props.user.email ? 'disabled' : '')}><i className="fa fa-trash" /> Delete Employee</button>
                </div>
                <div className="text-centre">
                    {this.state.employee_data == undefined ? 'Loading...' : <>
                        <div className="hero">
                            <hr />
                            <h2 className="text-centre"><i className="fa fa-user" /> Employee's Personal Data</h2>
                            <hr />
                        </div>
                        <div id="centred-div">
                            <table id="single-asset-table" className="table">
                                <tr>
                                    <th><i className="fa fa-id-card-o" />Employee ID</th>
                                    <td><code>{this._id}</code></td>
                                </tr>
                                <tr>
                                    <th><i className="fa fa-pencil-square-o" /> Forename</th>
                                    <td>{this.state.employee_data.forename}</td>
                                </tr>
                                <tr>
                                    <th><i className="fa fa-pencil-square-o" /> Surname</th>
                                    <td>{this.state.employee_data.surname}</td>
                                </tr>
                                <tr>
                                    <th><i className="fa fa-users" /> Department</th>
                                    <td><PillButton label={this.state.employee_data.department} /></td>
                                </tr>
                                <tr>
                                    <th><i className="fa fa-envelope-o" /> E-Mail</th>
                                    <td><a href={'mailto:' + this.state.employee_data.email}>{this.state.employee_data.email}</a></td>
                                </tr>
                            </table>
                        </div>
                    </>}
                </div>
                {this.state.asset_data && this.state.asset_data.length > 0 ?
                    <div className="text-centre">
                        <div className="hero">
                            <hr />
                            <h2><i className="fa fa-server" /> Hardware Asset List</h2>
                            <hr />
                        </div>
                        <p>This employee currently has <strong>{this.state.asset_data.length} {(this.state.asset_data.length > 1 || this.state.asset_data.length == 0) ? 'assets' : 'asset'}</strong> assigned to them.</p>
                        <HardwareAssetTable assets={this.state.asset_data} />
                    </div> :
                    <></>}
                <div id="centred-div">
                    <button className="btn btn-outline-primary" onClick={() => this.props.navigate(-1)}><i className="fa fa-undo" /> Return to previous page!</button>
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