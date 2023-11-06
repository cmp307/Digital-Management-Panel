import { Link } from "react-router-dom";
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
                <p><strong>Breadcrumbs »</strong> {formattedData}</p>
            </div>
        )
    }

}

export default Breadcrumbs;