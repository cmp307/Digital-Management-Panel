import { Component } from "react";
import { Asset as Asset } from "./Asset";
import PillButton from "./PillButton";
import { Employee } from "../interfaces/Employee";
import { Link } from "react-router-dom";

class AssetInfoTable extends Component<{ asset: Asset }> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false,
            data: null
        };
    }

    componentDidMount() {
        console.log(`http://127.0.0.1:3001/api/employee/${this.props.asset.employee.toString()}`);
        fetch(`http://127.0.0.1:3001/api/employee/${this.props.asset.employee.toString()}`)
            .then((res) => res.json())
            .then((res: any) => {
                console.log('===')
                console.log(res);
                if (res) {
                    const employee = res as Employee;
                    this.setState({ isLoaded: true, data: employee });
                }
            });
    }

    render() {
        return (
            <table id="single-asset-table" className="table">
                <tr>
                    <th><i className="fa fa-id-card-o" />Unique Asset ID</th>
                    <td>{this.props.asset._id.toString() ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-pencil-square-o" /> Name</th>
                    <td>{this.props.asset.name ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-list-alt" /> Model</th>
                    <td>{this.props.asset.model ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-cogs" /> Manufacturer</th>
                    <td>{this.props.asset.manufacturer ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-exchange" /> Asset Type</th>
                    <td><PillButton label={this.props.asset.type ?? '-'} /></td>
                </tr>
                <tr>
                    <th><i className="fa fa-wifi" /> IP Address</th>
                    <td>{this.props.asset.ip ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-user" /> Supervising Employee</th>
                    {(this.state.isLoaded == false) ? 'Fetching from Database...' : <td><Link to={`/employees/${this.props.asset.employee}`}>{this.state.data.name}</Link><code>(ID: {this.props.asset.employee})</code></td>}
                </tr>
                <tr>
                    <th><i className="fa fa-calendar" /> Purchase Date</th>
                    <td>{this.props.asset.date}
                        {/* <code>(15 days ago)</code> */}
                    </td>
                </tr>
                <tr>
                    <th><i className="fa fa-sticky-note-o" /> Note</th>
                    <td>{this.props.asset.note}</td>
                </tr>
            </table>
        )
    }
}

export default AssetInfoTable;