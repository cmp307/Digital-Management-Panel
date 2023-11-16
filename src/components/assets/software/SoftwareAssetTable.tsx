import { TextBlock } from "react-placeholder/lib/placeholders";
import { Link } from "react-router-dom";
import { Component } from 'react';
import { SoftwareAsset } from '../../../components/assets/software/SoftwareAsset';

class SoftwareAssetTable extends Component<{ assets: SoftwareAsset[] }> {
    constructor(props: any) {
        super(props);
        this.render = this.render.bind(this);
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        console.log(this.props.assets);
        if (!this.props.assets || this.props.assets.length == 0) {
            return <TextBlock rows={3} color='#CDCDCD' />
        }

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Asset ID</th>
                            <th scope="col">System Name</th>
                            <th scope="col">System Version</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.assets.map((item: any) => (
                            <tr key={item._id}>
                                <td><code>{item._id}</code></td>
                                <td>{item.name}</td>
                                <td><code>{item.version}</code></td>
                                <td>
                                    <Link to={`/software/${item._id}`} role="button" id="blue-button" className="btn btn-outline-primary "><i className="fa fa-eye" /> View Asset</Link>
                                    <Link to={`/edit/software/${item._id}`} role="button" id="blue-button" className="btn btn-outline-primary "><i className="fa fa-edit" /> Edit Asset</Link>
                                    <button onClick={() => {
                                        fetch(`http://127.0.0.1:3001/api/assets/software/${item._id}`, { method: 'DELETE' }).then(() => {
                                            this.refreshPage();
                                        })
                                    }} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete Asset</button>
                                    <Link to={`/software/${item._id}/scan`} role="button" id="blue-button" className="btn btn-outline-secondary"><i className="fa fa-dot-circle-o" /> Scan Asset</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );

    }
}

export default SoftwareAssetTable;