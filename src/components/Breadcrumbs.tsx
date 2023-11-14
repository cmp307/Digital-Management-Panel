import { Link, useNavigate } from "react-router-dom";
import '../styles/Breadcrumbs.scss';
import { Component } from 'react';
import { BreadcrumbHistory } from "../interfaces/Breadcrumbs";

class Breadcrumbs extends Component<{ history: BreadcrumbHistory[] }> {
    render() {
        const formattedData = this.props.history.map((x: any, key: number) => {
            if (key + 1 == this.props.history.length) {
                return (<span key={key}>
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
                <p className="left-aligned"><strong>Breadcrumbs »</strong> {formattedData}</p>
                <Link to={'/'} className="right-aligned">&lt;Return to Home Page&gt;</Link>
                <div className="clear"></div>
            </div>
        )
    }
}

export default Breadcrumbs;