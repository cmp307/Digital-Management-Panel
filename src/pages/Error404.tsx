import TopBar from "../components/TopBar";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Component } from 'react';
import { IEmployee } from "../interfaces/Employee";
import Breadcrumbs from "../components/Breadcrumbs";

class Error404 extends Component<{ user: IEmployee, setUser: Function, navigate:NavigateFunction }, { user: IEmployee, setUser: Function }> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            user: props.user,
            setUser: props.setUser
        }
    }

    go_back() {

    }

    render() {
        return (<div>
            <TopBar />
            <Breadcrumbs history={[
                { name: 'Home', path: '/' },
                { name: 'Error 404', path: '/' },

            ]} setUser={this.props.setUser} username={this.props.user.email} />
            <br />
            <div className="text-centre">
                <h1>Error 404 😔</h1>
                <p>You have navigated to an unreachable link! This resource is not available.</p>
                    <button className="btn btn-outline-primary" onClick={() => this.props.navigate(-1)}><i className="fa fa-undo" /> Return to previous page!</button>
            </div>
        </div>)
    }
}

export default (props:any) => {
    const navigation = useNavigate();
    return <Error404 {...props} navigate={navigation} />
};