import { Component } from "react";
import { Asset } from "../interfaces/Asset";
import PillButton from "./PillButton";

class AssetInfoTable extends Component<{ asset: Asset }> {
    constructor(props: any) {
        super(props);
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
                    <td><a href="#">Liam T.</a><code>(ID: {this.props.asset.employee})</code></td>
                </tr>
                <tr>
                    <th><i className="fa fa-calendar" /> Purchase Date</th>
                    <td>{this.props.asset.date} <code>(15 days ago)</code></td>
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