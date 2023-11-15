import { Component } from 'react';
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Breadcrumbs from '../components/Breadcrumbs';
import { Employee } from '../interfaces/Employee';

class Home extends Component<{ setUser: Function, user: Employee }, { user: Employee, setUser: Function }> {
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
                <div id='info-parent'>
                    <div id='info-child' className='text-centre'>
                        <br />
                        <h1>Welcome to the ScottishGlen Administration Panel!</h1>
                        <br />
                        <p>From here you can manage the <Link to={'/assets'}>Hardware</Link> & Software assets and use it to get a general overview of the assets contained within the company.</p>
                        <p>It can also be used for Vulnerability Scanning through the <a href='https://nvd.nist.gov/' target='_blank'>National Vulnerability Database</a>. If at anytime you would like to return to this page, click the logo at the top of your screen!</p>
                    </div>
                </div>
                <div className="container py-4 px-3 mx-auto button-list-container">
                    <div className="text-center button-list-child">
                        <Link to="/assets" className="btn btn-outline-primary" role="button"><i className="fa fa-server" /> View &amp; Manage Assets</Link>
                        <Link to="/employees" className="btn btn-outline-primary" role="button"><i className="fa fa-sitemap" /> View &amp; Manage Employees</Link>
                        <Link to="/versions" className="btn btn-outline-primary" role="button"><i className="fa fa-info" /> View Software Information</Link>
                    </div>
                </div>
            </>
        )
    }


    logout() {
        this.state.setUser(undefined);
        localStorage.clear();
    }
}

export default Home;