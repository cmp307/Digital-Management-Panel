import { TextBlock } from "react-placeholder/lib/placeholders";
import PillButton from "../../PillButton";
import { Link } from "react-router-dom";
import { Component } from 'react';
import { HardwareAsset } from "./HardwareAsset";

class HardwareAssetTable extends Component<{ assets: HardwareAsset[] }> {
    constructor(props: any) {
        super(props);
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        if(!this.props.assets || this.props.assets.length == 0) {
            return <TextBlock rows={3} color='#CDCDCD' />
        }

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Asset ID</th>
                            <th scope="col">System Name</th>
                            <th scope="col">System Type</th>
                            <th scope="col">System IP</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.assets && this.props.assets.length > 0) ? this.props.assets.map((item: any) => (
                            <tr key={item._id}>
                                <td><code>{item._id}</code></td>
                                <td>{item.name}</td>
                                <td><PillButton label={item.type} /></td>
                                <td>{item.ip}</td>
                                <td>{(item.parent_employee) ? <></> : <p className="red-text"><i className="fa fa-exclamation-circle"/> No Supervising Employee</p>}</td>
                                <td>
                                    <Link to={`/hardware/${item._id}`} role="button" id="blue-button" className="btn btn-outline-primary"><i className="fa fa-eye" /> View Asset</Link>
                                    <Link to={`/hardware/${item._id}/edit`} role="button" id="blue-button" className="btn btn-outline-primary"><i className="fa fa-edit" /> Edit Asset</Link>
                                    <button onClick={() => {
                                        fetch(`http://127.0.0.1:3001/api/assets/hardware/${item._id}`, { method: 'DELETE' }).then(() => {
                                            this.refreshPage();
                                        })
                                    }} className="btn btn-outline-danger" data-test-id={`delete-${item._id}`}><i className="fa fa-trash" /> Delete Asset</button>
                                </td>
                            </tr>
                        )) : <p className="text-centre">Loading...</p>}
                    </tbody>
                </table>

            </div>
        );

    }
}

export default HardwareAssetTable;