import { Component } from "react";
import TopBar from "../components/TopBar";
import '../styles/Login.scss';
import { Employee } from "../interfaces/Employee";
import { IPCSystemData } from "../interfaces/IPC";

class Login extends Component<{ setUser: Function, user: Employee }> {
    private _setUser: any;
    constructor(props: any) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            data: undefined
        }
        this._setUser = props.setUser;
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleFormUpdate(e: any) {
        const _state = this.state as any;
        switch (e.target.id) {
            case 'email':
                _state.email = e.target.value;
                break;
            case 'password':
                _state.password = e.target.value;
                break;
        }
        this.setState(_state);
    }

    handleFormSubmission(e: any) {
        const _state = this.state as any;
        e.preventDefault();
        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            body: JSON.stringify(_state),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then((res) => {
            console.log(`Form submitted & recieved ${res.status}`);
            if (res.status == 200) {
                this._setUser(_state);
                console.log(_state);
                localStorage.setItem('user', JSON.stringify(_state))
            }
        });
    }

    componentDidMount() {
        // @ts-ignore: Unreachable code error
        window.electron.getData().then((data: IPCSystemData) => {
            console.log('mountdata->',data);
            this.setState({ data: data });
        })
    }
    render() {
        return (
            <>
                <TopBar linkToHomepage={false} />
                <br></br>
                <div className="alert alert-info" role="alert">
                    <h4 className="alert-heading">Demonstration Login!</h4>
                    <p>As this is a demonstration you may login using the credentials listed below. You can then create new Employee Accounts and login with them.</p>
                    <hr />
                    <p className="mb-0"><strong>E-Mail Address</strong>: demo@example.com</p>
                    <p className="mb-0"><strong>Password</strong>: demo</p>
                </div>
                <div className="container py-4 px-3 mx-auto">
                    <div className="text-center">
                        <form id="login" onSubmit={this.handleFormSubmission}>
                            <label htmlFor="email">E-Mail Address</label><br></br>
                            <input
                                id="email"
                                name="email"
                                placeholder="Please enter your e-mail address."
                                type="email"
                                onChange={this.handleFormUpdate}></input>
                            <label htmlFor="password">Password</label><br></br>
                            <input
                                id="password"
                                name="password"
                                placeholder="Please enter your password."
                                type="password"
                                onChange={this.handleFormUpdate}></input>
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;