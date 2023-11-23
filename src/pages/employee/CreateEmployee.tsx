// import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../../components/TopBar";
import '../../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IEmployee } from "../../interfaces/Employee";
import Breadcrumbs from "../../components/Breadcrumbs";

class CreateEmployee extends Component<{ setUser: Function, user: IEmployee, navigate: NavigateFunction }, { setUser: Function, user: IEmployee, form_data: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            setUser: props.setUser,
            user: props.user,
            form_data: {}
        }
    }

    onSubmit = async (e: any) => {
        console.log('submitted')
        e.preventDefault();

        const data = this.state.form_data;
        const { password, confirmPassword } = data;
        console.log(data);
        if (password == confirmPassword) {

            await fetch('http://127.0.0.1:3001/api/employees/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(() => {
                this.props.navigate('/employees');
            })
        }

        return false;
        // method="post" action="" onSubmit={async () => { await delay(1000); this.props.navigate('/employees') }
    }

    handleChange(key: string, value: any) {
        const curr = this.state.form_data;
        this.setState({ form_data: { ...curr, [key]: value } });
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Employees', path: '/employees' },
                    { name: 'Create', path: '/employees/create' },
                ]} setUser={this.state.setUser} user={this.state.user} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-user" /> Create an Employee</h2>
                    <hr />
                </div>

                <form id="asset-form" onSubmit={this.onSubmit}>
                    <div id="question">
                        <label htmlFor="forename"><i className="fa fa-pencil-square-o" /> Forename<span className="red-star">*</span></label><br />
                        <input type="text" id="forename" name="forename" onChange={e => this.handleChange('forename', e.target.value)} placeholder="Please enter the forename for the Employee." required></input>
                    </div>
                    <div id="question">
                        <label htmlFor="surname"><i className="fa fa-pencil-square-o" /> Surname<span className="red-star">*</span></label><br />
                        <input type="text" id="surname" name="surname" onChange={e => this.handleChange('surname', e.target.value)} placeholder="Please enter the surname for the Employee." required></input>
                    </div>

                    <div id="question">
                        <label htmlFor="email"><i className="fa fa-envelope-o" /> Email</label><br />
                        <input type="text" id="email" name="email" onChange={e => this.handleChange('email', e.target.value)} disabled value={(this.state.form_data.forename && this.state.form_data.surname) ? `${this.state.form_data.forename[0]}.${this.state.form_data.surname}@scottishglen.co.uk` : ''}></input>
                    </div>

                    <div id="question">
                        <label htmlFor="department"><i className="fa fa-users" /> Department<span className="red-star">*</span></label><br />
                        <select name="department" onChange={e => this.handleChange('department', e.target.value)} id="department" required>
                            <option disabled selected value=''>[Please select a Department for the Employee]</option>
                            {[
                                'Finance',
                                'Human Resources',
                                'Operations',
                                'Sales',
                                'Information Technology'
                            ]
                                .map(x => { return <option value={x}>{x}</option> })}
                        </select>
                    </div>

                    <div id="question">
                        <label htmlFor="password"><i className="fa fa-key" /> Password</label><br />
                        <input type="password" id="password" onChange={e => this.handleChange('password', e.target.value)} name="password"></input>
                    </div>
                    <div id="question">
                        <label htmlFor="confirmPassword"><i className="fa fa-key" /> Confirm Password</label><br />
                        <input type="password" id="confirmPassword" onChange={e => this.handleChange('confirmPassword', e.target.value)} name="confirmPassword"></input>
                    </div>

                    <br />

                    <input type="submit"></input>
                    <button className="cancel" type="button" onClick={() => this.props.navigate(-1)}>Cancel</button>
                </form>
            </>
        )
    }
}

export default (props: any) => {
    const navigation = useNavigate();
    return <CreateEmployee {...props} navigate={navigation} />
};