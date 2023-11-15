import Breadcrumbs from "../../components/Breadcrumbs";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";
import EmployeeTable from "../../components/tables/EmployeeTable";
import { Component } from 'react';
import { Employee } from "../../interfaces/Employee";
class Employees extends Component<{ setUser: Function, user: Employee }, { data: Employee[], user: Employee, setUser: Function }> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            user: props.user,
            setUser: props.setUser
        }
        this.updateEmployees = this.updateEmployees.bind(this);
        this.deleteAllEmployees = this.deleteAllEmployees.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    componentDidMount() { this.updateEmployees() }

    updateEmployees() {
        fetch('http://127.0.0.1:3001/api/employees')
            .then((res) => res.json())
            .then((res) => {
                const _state = this.state as any;
                _state.data = [...res];
                this.setState(_state);
            })
            .catch((err) => console.error(err))
    }

    deleteAllEmployees() {
        fetch('http://127.0.0.1:3001/api/delete-all-employees', { method: 'DELETE' }).then(() => {
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
                    { name: 'Employees', path: '/employees' },
                ]} setUser={this.props.setUser} username={this.props.user.email} />

                <h2 className="text-centre">Action Buttons</h2>
                <div id="action-buttons">
                    <Link to={'/employees/create'} className="btn btn-outline-primary"><i className="fa fa-plus" /> Create Employee</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Employees</button>
                    <button onClick={this.deleteAllEmployees} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Employees</button>
                </div>
                <hr />
                <h2 className="text-centre">Employee List</h2>
                <p className="text-centre">There is currently <strong>{this.state.data.length}</strong> {(this.state.data.length > 1 || this.state.data.length == 0) ? 'employees' : 'employee'} stored within the Database.</p>
                <EmployeeTable assets={this.state.data} />
            </>
        )
    }
}

export default Employees;