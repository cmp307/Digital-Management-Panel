import { Link } from "react-router-dom";
import '../styles/Breadcrumbs.scss';
import { Component } from 'react';
import { BreadcrumbHistory } from "../interfaces/Breadcrumbs";

class Breadcrumbs extends Component<{ username: string, history?: BreadcrumbHistory[], setUser: Function }, { setUser: Function }> {
    constructor(props: any) {
        super(props);
        this.state = {
            setUser: props.setUser
        };
        this.logout = this.logout.bind(this);
    }

    render() {
        if (this.props.history && this.props.history.length > 0) {
            const formattedData = this.props.history.map((x: any, key: number) => {
                if (key + 1 == (this.props.history?.length ?? 0)) {
                    return (<span key={x.name}>
                        {x.name}
                    </span>)
                } else {
                    return <>
                        <Link to={x.path}>{x.name}</Link><a> / </a>
                    </>
                }
            });

            return (
                <div id="breadcrumbs">
                    <p className="left-aligned"><i className="fa fa-history" /> <strong>Breadcrumbs »</strong> {formattedData}</p>
                    <div className="right-aligned">
                        <p><i className="fa fa-user" /> {this.props.username}</p>
                        <button className="btn btn-danger" onClick={this.logout}><i className="fa fa-sign-out" /> Logout</button>
                    </div>
                    <div className="clear"></div>
                </div>
            )
        };
        return (
            <div id="breadcrumbs">
                <p className="left-aligned">
                    <p className="left-aligned"><i className="fa fa-history" /> <strong>Breadcrumbs »</strong> Home</p>
                </p>
                <p className="right-aligned">
                    <p><i className="fa fa-user" /> {this.props.username}</p>
                    <button className="btn btn-danger" onClick={this.logout}><i className="fa fa-sign-out" /> Logout</button>
                </p>
                <div className="clear"></div>
            </div>
        )
    }

    logout() {
        this.state.setUser(undefined);
        localStorage.clear();
    }

}


export default Breadcrumbs;