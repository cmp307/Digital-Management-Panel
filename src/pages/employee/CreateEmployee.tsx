// import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../../components/TopBar";
import '../../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IEmployee } from "../../interfaces/Employee";
import Breadcrumbs from "../../components/Breadcrumbs";

// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class CreateEmployee extends Component<{ setUser: Function, user: IEmployee, navigate: NavigateFunction }, { setUser: Function, user: IEmployee, form_data: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            setUser: props.setUser,
            user: props.user,
            form_data: {}
        }
    }

    handleChange(key: string, value: any) {
        const curr = this.state.form_data;
        this.setState({ form_data: { ...curr, [key]: value } });
        console.log(this.state);
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Assets', path: '/assets' },
                    { name: 'Create', path: '/assets/create' },
                ]} setUser={this.state.setUser} username={this.state.user.email} />
                <h2 className="text-centre">Create an Employee</h2>

                <form id="asset-form" method="get" action="http://localhost:3001/api/assets/create" onSubmit={async () => { await delay(1000); this.props.navigate('/assets') }}>
                    <div id="question">
                        <label htmlFor="forename"><i className="fa fa-pencil-square-o" /> Forename<span className="red-star">*</span></label><br />
                        <input type="text" id="forename" name="forename" onChange={e => this.handleChange('forename', e.target.value)} placeholder="Please enter the forename for the Employee." required></input>
                    </div>
                    <div id="question">
                        <label htmlFor="surname"><i className="fa fa-pencil-square-o" /> Surname<span className="red-star">*</span></label><br />
                        <input type="text" id="surname" name="surname" onChange={e => this.handleChange('surname', e.target.value)} placeholder="Please enter the surname for the Employee." required></input>
                    </div>
                    
                    <div id="question">
                        <label htmlFor="email"><i className="fa fa-pencil-square-o" /> Email</label><br />
                        <input type="text" id="email" name="email" disabled value={(this.state.form_data.forename && this.state.form_data.surname) ? `${this.state.form_data.forename[0]}.${this.state.form_data.surname}@scottishglen.co.uk` : ''}></input>
                    </div>

                    <div id="question">
                        <label htmlFor="type"><i className="fa fa-exchange" /> Department<span className="red-star">*</span></label><br />
                        <select name="type" id="type" required>
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
                        <input type="password" id="password" name="password"></input>
                    </div>
                    <div id="question">
                        <label htmlFor="confirm-password"><i className="fa fa-key" /> Confirm Password</label><br />
                        <input type="password" id="confirm-password" name="confirm-password"></input>
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