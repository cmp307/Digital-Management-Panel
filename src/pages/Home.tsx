import { Component } from 'react';
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Breadcrumbs from '../components/Breadcrumbs';
import { Employee } from '../interfaces/Employee';

class Home extends Component<{ setUser: Function, user:Employee}> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: props.user,
            setUser: props.setUser
        }
        console.log(this.props.user);
        this.logout = this.logout.bind(this);
    }

    render() {
        return (
            <>
                <TopBar linkToHomepage={false} />
                <Breadcrumbs history={[]} username={this.props.user.email} setUser={this.props.setUser} />
                <div className="container py-4 px-3 mx-auto">
                    <div className="text-center">
                        <br /><br />
                        <Link to="/assets" className="btn btn-outline-primary" role="button"><i className="fa fa-server" /> View &amp; Manage Assets</Link>
                        <Link to="/employees" className="btn btn-outline-primary" role="button"><i className="fa fa-sitemap" /> View &amp; Manage Employees</Link>
                        <Link to="/versions" className="btn btn-outline-primary" role="button"><i className="fa fa-info" /> View Software Information</Link>
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