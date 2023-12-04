import '../../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import TopBar from '../../components/TopBar';
import Breadcrumbs from '../../components/Breadcrumbs';
import { IEmployee } from '../../interfaces/Employee';

class EditEmployee extends Component<{ setUser: Function, user: IEmployee, id: string, navigate: NavigateFunction }, { employee_data?: IEmployee[], setUser: Function, user: IEmployee, form_data: any }> {
    private _id: string;
    constructor(props: any) {
        super(props);
        this._id = props.id;
        this.state = {
            employee_data: undefined,
            setUser: props.setUser,
            user: props.user,
            form_data: {}
        }
        this.render = this.render.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:3001/api/employees/${this._id}`)
            .then((res) => res.json())
            .then((res) => this.setState({ employee_data: res, form_data: res }))
            .catch((err) => console.error(err))
    }

    handleChange(key: string, value: any) {
        const curr = this.state.form_data;
        this.setState({ form_data: { ...curr, [key]: value } });
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:3001/api/employees/${this._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...this.state.form_data })
        }).then(() => {
            this.props.navigate(`/employees/${this._id}`);
        })
        return false;
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Employees', path: '/employees' },
                    { name: this.props.id, path: `/employees/${this._id}` },
                    { name: 'Edit', path: `/employees/${this._id}/edit` },
                ]} setUser={this.state.setUser} user={this.state.user} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-user" /> Edit an Employee</h2>
                    <hr />
                </div>
                <p className="text-centre"><i className="fa fa-id-card-o" /> <strong>Employee ID</strong>: <code>{this._id}</code></p>
                {this.state.employee_data || this.state.form_data ?
                    <form id="asset-form" onSubmit={this.onSubmit}>
                        <div id="question">
                            <label htmlFor="name"><i className="fa fa-pencil-square-o" /> Forename<span className="red-star">*</span></label><br />
                            <input
                                type="text"
                                id="forename"
                                name="forename"
                                value={this.state.form_data?.forename ?? undefined}
                                onChange={e => this.handleChange('forename', e.target.value)}
                                placeholder="Please enter the forename for the Employee."
                                required></input>
                        </div>

                        <div id="question">
                            <label htmlFor="surname"><i className="fa fa-pencil-square-o" /> Surname<span className="red-star">*</span></label><br />
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={this.state.form_data?.surname ?? undefined}
                                onChange={e => this.handleChange('surname', e.target.value)}
                                placeholder="Please enter the surname of the Employee."></input>
                        </div>

                        <div id="question">
                            <label htmlFor="department"><i className="fa fa-users" /> Department<span className="red-star">*</span></label><br />
                            <select value={this.state.form_data.department ?? undefined} onChange={e => this.handleChange('department', e.target.value)} name="department" id="department" required>
                                {[
                                    'Finance',
                                    'Human Resources',
                                    'Operations',
                                    'Sales',
                                    'Information Technology'
                                ]
                                    .map((x) => {
                                        if (x == this.state.form_data?.department) return <option selected value={x}>{x}</option>
                                        return <option value={x}>{x}</option>
                                    })}
                            </select>
                        </div>
                        <br />

                        <input type="submit"></input>
                        <button className="cancel" type="button" onClick={() => this.props.navigate(-1)}>Cancel</button>
                    </form >
                    : <p className="text-centre">Loading...</p>
                }
            </>
        )
    }
}

export default (props: any) => {
    const { id } = useParams();
    if (!id) throw new Error(`EditEmployee: Invalid ID for Employee. Given: ${id}`);

    const navigation = useNavigate();
    return <EditEmployee {...props} navigate={navigation} id={id} />
};