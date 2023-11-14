import { Component } from 'react';
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import '../styles/Home.scss';

class Home extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            user: props.user,
            setUser: props.setUser
        }
        this.logout = this.logout.bind(this);
    }

    render() {
        return (
            <>
                <TopBar linkToHomepage={false} />
                <div className="container py-4 px-3 mx-auto">
                    <div className="text-center">
                        <br /><br />
                        <Link to="/assets" className="btn btn-outline-primary" role="button"><i className="fa fa-server" /> View &amp; Manage Assets</Link>
                        <br /><br />
                        <Link to="/employees" className="btn btn-outline-primary" role="button"><i className="fa fa-sitemap" /> View &amp; Manage Employees</Link>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer-child text-centre">
                        <h2><i className="fa fa-user" /></h2>
                        <p>Your are logged in as <code>{this.state.user.email}</code></p>
                        <button className="btn btn-outline-danger" onClick={this.logout}><i className="fa fa-sign-out" /> Logout</button>
                    </div>
                </div>
            </>
        )
    }


    logout() {
        const _state = this.state as any;
        this.state.setUser(undefined);
    }
}

export default Home;