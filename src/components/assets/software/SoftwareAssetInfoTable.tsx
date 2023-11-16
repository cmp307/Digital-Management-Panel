import { Component } from "react";
import PillButton from "../../PillButton";
import { SoftwareAsset } from "./SoftwareAsset";
import { ISoftwareAsset } from "../../../interfaces/Asset";
import { HardwareAsset } from "../hardware/HardwareAsset";
import { Link } from "react-router-dom";

class SoftwareAssetInfoTable extends Component<{ asset: SoftwareAsset }, { isLoaded: boolean, data?: HardwareAsset }> {
    private date: Date;
    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false,
            data: undefined
        };
        this.date = new Date(this.props.asset.parent_hardware?.date ?? new Date().toISOString());
    }

    componentDidMount() {
        if (this.props.asset.parent_hardware?.id) {
            fetch(`http://127.0.0.1:3001/api/assets/hardware/${this.props.asset.parent_hardware?.id.toString()}`)
                .then((res) => res.json())
                .then((res: any) => {
                    if (res) {
                        const parent = new HardwareAsset(res);
                        this.setState({ isLoaded: true, data: parent });
                    }
                });
        }
    }

    getLinkDate() {
        const timestring = [
            this.date.getHours().toString().padStart(2, '0'),
            this.date.getMinutes().toString().padStart(2, '0')
        ].join(':');
        return `${this.date.toLocaleDateString()} (${timestring})`
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
                    <th><i className="fa fa-wifi" /> Parent Hardware</th>
                    <td><Link to={`/assets/${this.state.data?._id}`}>{this.state.data?.name}</Link> (IP: <code>{this.state.data?.ip}</code>)</td>
                </tr>
                <tr>
                    <th><i className="fa fa-plus-circle" /> Created At</th>
                    <td>{this.getLinkDate()}</td>
                </tr>
            </table>
        )
    }
}

export default SoftwareAssetInfoTable;