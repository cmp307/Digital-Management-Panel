import { TextBlock } from "react-placeholder/lib/placeholders";
import { Link } from "react-router-dom";
import { Component } from 'react';
import PillButton from "../../PillButton";
import { HardwareAsset } from "./HardwareAsset";

class HardwareLinkTable extends Component<{ assets: { hardware: HardwareAsset, link: any }[], id: string }> {
    constructor(props: any) {
        super(props);
        this.render = this.render.bind(this);
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        console.log('props=====', this.props.assets);
        if (!this.props.assets || this.props.assets.length == 0) {
            return <TextBlock rows={3} color='#CDCDCD' />
        }

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Link ID</th>
                            <th scope="col">System Name</th>
                            <th scope="col">System Type</th>
                            <th scope="col">System IP</th>
                            <th scope="col">Installed By</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.assets.map((item: any) => {
                            if(!item.hardware || !item.link) return <></>;
                            return (
                                <tr key={item.hardware._id}>
                                    <td><code>{item.hardware._id}</code></td>
                                    <td>{item.hardware.name}</td>
                                    <td><PillButton label={item.hardware.type} /></td>
                                    <td><code>{item.hardware.ip}</code></td>
                                    <td>{item.link.created_by}</td>
                                    <td>
                                        <Link to={`/hardware/${item.hardware._id}`} role="button" id="blue-button" className="btn btn-outline-primary "><i className="fa fa-eye" /> View Asset</Link>
                                        <Link to={`/hardware/${item.hardware._id}/edit`} role="button" id="blue-button" className="btn btn-outline-primary "><i className="fa fa-edit" /> Edit Asset</Link>
                                        <button onClick={() => {
                                            fetch(`http://127.0.0.1:3001/api/asset-link/hardware/${this.props.id}/${item.software._id}`, { method: 'DELETE' }).then(() => {
                                                this.refreshPage();
                                            })
                                        }} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete Asset Link</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        );

    }
}

export default HardwareLinkTable;