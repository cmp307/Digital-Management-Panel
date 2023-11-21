import { Component } from 'react';
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Breadcrumbs from '../components/Breadcrumbs';
import { IEmployee } from '../interfaces/Employee';
import { IIPCSystemData } from '../interfaces/IPC';

class Home extends Component<{ setUser: Function, user: IEmployee, hasRan: boolean, setRan: Function }, { user: IEmployee, setUser: Function, data: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: props.user,
            setUser: props.setUser,
            data: undefined
        }
        console.log(this.props.user);
        this.logout = this.logout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        if(this.props.hasRan == true) return;
        this.props.setRan(true);
        try {
            // @ts-ignore: Unreachable code error
            window.electron.getData().then(async (data: IIPCSystemData) => {
                console.log('mountdata->', data);
                this.setState({ data: data });
                console.log('SWID FETCH');
                const swid = await fetch(`http://127.0.0.1:3001/api/assets/software`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: data.distro, version: data.release, manufacturer: data.platform, risk_level: 'N/A' })
                })

                const hwid = await fetch(`http://127.0.0.1:3001/api/assets/hardware`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: data.hostname, manufacturer: data.manufacturer, model: data.model, type: (data.isLaptop) ? 'Laptop' : 'Workstation', ip: data.ip })
                })

                const swid_json = await swid.json();
                const hwid_json = await hwid.json();
                console.log(swid_json);
                console.log(hwid_json);
                console.log('HWID FETCH');

                const _data = {
                    software_id: swid_json.id,
                    hardware_id: hwid_json.id,
                    date: new Date().toISOString(),
                    created_by: this.props.user.email
                }

                console.log(_data);
                console.log('ASSET LINKFETCH');
                const resp = await fetch('http://127.0.0.1:3001/api/asset-link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(_data)
                }).then(res => res.json()).catch(() => { })

                console.log(resp);
            })
        } catch (error) { }
    }

    render() {
        return (
            <>
                <TopBar linkToHomepage={false} />
                <Breadcrumbs history={[]} username={this.props.user.email} setUser={this.props.setUser} />
                <div className='hero hero-index text-centre'>
                    <br />
                    <h2><i className='fa fa-home' /> Welcome to the <strong>ScottishGlen</strong> Administration Panel!</h2>
                    <br />
                </div>
                <div id='info-parent'>
                    <div id='info-child' className='text-centre'>
                        <br />
                        <p>From here you can manage the <Link to={'/hardware'}><i className='fa fa-server' /> Hardware</Link> and <Link to={'/software'}><i className='fa fa-cloud-download' /> Software</Link> assets and use it to get a general overview of the assets contained within the company.</p>
                        <p>It can also be used for Vulnerability Scanning.<br />It does this through use of the <a href='https://nvd.nist.gov/' target='_blank'><i className='fa fa-shield' /> National Vulnerability Database</a><br /><br />If at anytime you would like to return to this page, click the logo at the top of your screen!</p>
                    </div>
                </div>
                <div className="container py-4 px-3 mx-auto button-list-container">
                    <div className="text-center button-list-child">
                        <Link to="/hardware" className="btn btn-outline-primary" role="button"><i className="fa fa-server" /> View &amp; Manage Hardware Assets</Link>
                        <Link to="/software" className="btn btn-outline-primary" role="button"><i className="fa fa-cloud-download" /> View &amp; Manage Software Assets</Link>
                        <Link to="/employees" className="btn btn-outline-primary" role="button"><i className="fa fa-sitemap" /> View &amp; Manage Employees</Link>
                        <Link to="/versions" className="btn btn-outline-secondary" role="button"><i className="fa fa-info-circle" /> View Software Information</Link>
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