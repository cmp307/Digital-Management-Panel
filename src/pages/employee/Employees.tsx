import Breadcrumbs from "../../components/Breadcrumbs";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";
import EmployeeTable from "../../components/employee/EmployeeTable";
import { Component } from 'react';
import { IEmployee } from "../../interfaces/Employee";
class Employees extends Component<{ setUser: Function, user: IEmployee }, { data: IEmployee[], user: IEmployee, setUser: Function }> {
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
        fetch('http://127.0.0.1:3001/api/employees/view-all')
            .then((res) => res.json())
            .then((res) => {
                const _state = this.state as any;
                _state.data = [...res];
                this.setState(_state);
            })
            .catch((err) => console.error(err))
    }

    deleteAllEmployees() {
        fetch('http://127.0.0.1:3001/api/employees/delete-all', { method: 'DELETE' }).then(() => {
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

                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-terminal" /> Action Buttons</h2>
                    <hr />
                </div>
                <div id="action-buttons">
                    <Link to={'/employees/create'} className="btn btn-outline-success"><i className="fa fa-plus" /> Create an Employee</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Employees</button>
                </div>
                <div className="hero">
                    <hr />
                    <h2 className="text-centre"><i className="fa fa-user" /> Employee List</h2>
                    <hr />
                </div>
                <p className="text-centre">There is currently <strong>{this.state.data.length}</strong> {(this.state.data.length > 1 || this.state.data.length == 0) ? 'employees' : 'employee'} stored within the Database.</p>
                <EmployeeTable assets={this.state.data} />
            </>
        )
    }
}

export default Employees;