import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import { Link } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {
    const [data, setData] = useState([] as any[]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/employees')
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error(err))
    }, []);

    console.log(data);

    return (
        <>
            <TopBar heading="Employee Management Panel" />
            <Breadcrumbs history={[
                { name: 'Home', path: '/' },
                { name: 'Employees', path: '/employees' },
            ]} />

            <h2 className="text-centre">Action Buttons</h2>
            <div id="action-buttons">
                <Link to={'/employee/create'} className="btn btn-outline-primary"><i className="fa fa-plus" /> Create Employee</Link>
                <button onClick={refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Employees</button>
                <button onClick={deleteAllEmployees} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete <strong>All</strong> Employees</button>
            </div>
            <hr />
            <h2 className="text-centre">Employee List</h2>
            <p className="text-centre">There {(data.length > 1) ? 'are' : 'is'} currently <strong>{data.length} {(data.length > 1 || data.length == 0) ? 'employees' : 'employee'}</strong> stored within the Database.</p>
            <EmployeeTable assets={data} />
        </>
    )
}

function deleteAllEmployees() {
    fetch('http://127.0.0.1:3001/api/delete-all-employees', { method: 'DELETE' }).then(() => {
        refreshPage();
    })
}

function refreshPage() {
    window.location.reload();
}

export default Employees;