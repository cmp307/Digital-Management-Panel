import { TextBlock } from "react-placeholder/lib/placeholders";
import PillButton from "./PillButton";
import { Link } from "react-router-dom";

const YourComponent = ({ data }: any) => {
    if(data.length == 0) {
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
                        <th scope="col">Managed By</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item:any) => (
                        <tr key={item._id}>
                            <td><code>{item._id}</code></td>
                            <td>{item.name}</td>
                            <td><PillButton data={item.type} /></td>
                            <td><Link to={`/employee/${item.managedBy.uid}`}>{item.managedBy.name}</Link></td>
                            <td>
                                <button type="button" className="btn btn-primary">Edit Asset</button>
                                <button type="button" className="btn btn-danger">Delete Asset</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default YourComponent;