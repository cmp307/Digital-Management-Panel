import TopBar from "../components/TopBar";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Component } from 'react';
import { IEmployee } from "../interfaces/Employee";
import Breadcrumbs from "../components/Breadcrumbs";

class Versions extends Component<{ user: IEmployee, setUser: Function, navigate: NavigateFunction }, { user: IEmployee, setUser: Function }> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: props.user,
            setUser: props.setUser
        }
    }

    render() {
        return (<div>
            <TopBar />
            <Breadcrumbs history={[
                { name: 'Home', path: '/' },
                { name: 'Versions', path: '/versions' },

            ]} setUser={this.props.setUser} username={this.props.user.email} />
            <div className="text-centre software">
                <div className="hero">
                    <div id="spacer"></div>
                    <h2><i className="fa fa-info-circle" /> Software Information</h2>
                    <hr />
                </div>
                <p>If software is noticed to be out of date or subject to a Vulnerability report. Advise Development team ASAP so that the issue can be triaged and resolved.</p>
                <p>Created by: <a href="https://github.com/LiamTownsley2" target="_blank">Liam Townsley</a> (<code>ID: 2301060</code>)</p>
                <p><img src={'https://i.imgur.com/UDbWcZO.png'} /><strong>Node.js</strong><br />v{(window as any).api.node()}</p>
                <p><img src={'https://i.imgur.com/FTsep9l.png'} /><strong>Electron</strong><br />v{(window as any).api.electron()}</p>
                <p><img src={'https://i.imgur.com/ZZWDXbF.png'} /><strong>Google Chrome</strong><br />v{(window as any).api.chrome()}</p>
                <button className="btn btn-outline-primary" onClick={() => this.props.navigate(-1)}><i className="fa fa-undo" /> Return to previous page!</button>
            </div>
        </div>)
    }
}

export default (props: any) => {
    const navigation = useNavigate();
    return <Versions {...props} navigate={navigation} />
};