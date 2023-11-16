import { Component } from "react";
import PillButton from "../../PillButton";
import { IEmployee } from "../../../interfaces/Employee";
import { Link } from "react-router-dom";
import { HardwareAsset } from "./HardwareAsset";

class HardwareAssetInfoTable extends Component<{ asset: HardwareAsset }, { isLoaded: boolean, data?: IEmployee }> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false,
            data: undefined
        };
    }

    componentDidMount() {
        if (this.props.asset.parent_employee) {
            fetch(`http://127.0.0.1:3001/api/employees/${this.props.asset.parent_employee.toString()}`)
                .then((res) => res.json())
                .then((res: any) => {
                    if (res) {
                        const employee = res as IEmployee;
                        this.setState({ isLoaded: true, data: employee });
                    }
                });
        }
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
                    <td>{(this.state.data) ? <><Link to={`/employees/${this.state.data._id}`}>{this.state.data?.forename + ' ' + this.state.data.surname ?? '-'}</Link><code>(ID: {this.state.data?._id.toString() ?? '-'})</code></> : '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-calendar" /> Purchase Date</th>
                    <td>{this.props.asset.date}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-sticky-note-o" /> Note</th>
                    <td>{this.props.asset.note}</td>
                </tr>
            </table>
        )
    }
}

export default HardwareAssetInfoTable;