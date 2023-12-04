import { Component } from "react";
import { SoftwareAsset } from "./SoftwareAsset";
import { HardwareAsset } from "../hardware/HardwareAsset";
import PillButton from "../../PillButton";

class SoftwareAssetInfoTable extends Component<{ asset: SoftwareAsset }, { isLoaded: boolean, data?: HardwareAsset }> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false,
            data: undefined
        };
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        console.log(this.props.asset);
        fetch(`http://127.0.0.1:3001/api/asset-link/software/${this.props.asset._id.toString()}`)
            .then((res) => res.json())
            .then((res: any) => {
                this.setState({ isLoaded: true, data: new HardwareAsset(res) });
            });
    }

    render() {
        return (
            <table id="single-asset-table" className="table">
                <tr>
                    <th><i className="fa fa-id-card-o" /> Unique Asset ID</th>
                    <td>{this.props.asset._id.toString() ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-pencil-square-o" /> Name</th>
                    <td>{this.props.asset.name ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-cogs" /> Manufacturer</th>
                    <td>{this.props.asset.manufacturer ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-code-fork" /> Version</th>
                    <td>{this.props.asset.version ?? '-'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-exclamation-circle" /> Risk Level</th>
                    <td><PillButton label={this.props.asset?.risk_level ?? 'N/A'} /></td>
                </tr>
                <tr>
                    <th><i className="fa fa-calendar" /> Created At</th>
                    <td>{(new Date(this.props.asset?.created_at).toLocaleDateString() + ` (${new Date(this.props.asset.created_at).toLocaleTimeString()})`) || 'Loading...'}</td>
                </tr>
                <tr>
                    <th><i className="fa fa-calendar" /> Last Edited At</th>
                    <td>{(new Date(this.props.asset?.last_edit_at).toLocaleDateString() + ` (${new Date(this.props.asset.last_edit_at).toLocaleTimeString()})`) || 'Loading...'}</td>
                </tr>
            </table>
        )
    }
}

export default SoftwareAssetInfoTable;