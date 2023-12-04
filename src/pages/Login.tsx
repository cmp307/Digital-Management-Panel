import { Component } from "react";
import TopBar from "../components/TopBar";
import '../styles/Login.scss';
import { IEmployee } from "../interfaces/Employee";

class Login extends Component<{ setUser: Function, user: IEmployee }> {
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
        fetch('http://127.0.0.1:3001/api/employees/login', {
            method: 'POST',
            body: JSON.stringify(_state),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status == true) {
                this._setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data))
            }
        });
    }

    render() {
        return (
            <>
                <TopBar linkToHomepage={false} />
                <br></br>
                <div id="clippy-alert" className="alert alert-warning" role="alert">
                    <div>
                        <img src="https://i.imgur.com/7Y6f2JD.png" />
                    </div>
                    <div>
                        <h4 className="alert-heading">Demonstration Login!</h4>
                        <p>As this is a demonstration you may login using the credentials listed below. You can then create new Employee Accounts and login with them.</p>
                        <hr />
                        <p className="mb-0"><strong>E-Mail Address</strong>: demo@example.com</p>
                        <p className="mb-0"><strong>Password</strong>: demo</p>
                    </div>

                </div>
                <div className="container py-4 px-3 mx-auto">
                    <div className="text-center">
                        <form id="asset-form" className="login-form" onSubmit={this.handleFormSubmission}>
                            <label htmlFor="email"><i className="fa fa-envelope-o" /> E-Mail Address</label>
                            <input
                                id="email"
                                name="email"
                                placeholder="Please enter your e-mail address."
                                type="email"
                                onChange={this.handleFormUpdate}></input>
                            <label htmlFor="password"><i className="fa fa-lock" /> Password</label>
                            <input
                                id="password"
                                name="password"
                                placeholder="Please enter your password."
                                type="password"
                                onChange={this.handleFormUpdate}></input>
                            <input type="submit"></input>
                            <button role="button" id="cancel" onClick={() => {
                                // @ts-ignore: Unreachable code error
                                window.electron.close();
                            }}>Close Application</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;