import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/Assets.scss';

function Assets() {
    return (
        <>
            <TopBar subtext="Asset Management Panel" />
            <Breadcrumbs path="Assets" />
            <h2 className="text-centre">Action Buttons</h2>
            <div id="action-buttons">
                <button className="btn"><i className="fa fa-plus" /> Create an Asset</button>
                <button className="btn danger"><i className="fa fa-minus" /> Delete All Assets</button>
            </div>
            <hr />
            <h2 className="text-centre">Asset List</h2>
            <p className="text-centre">There is a total of <strong>{0} assets</strong>.</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">System Name</th>
                        <th scope="col">System Type</th>
                        <th scope="col">Managed By</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">jbXi3X</th>
                        <td>Front Door</td>
                        <td>Door Monitor</td>
                        <td><a href="#">Liam T.</a></td>
                        <td>
                            <button type="button" className="btn btn-primary">Edit Asset</button>
                            <button type="button" className="btn btn-danger">Delete Asset</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">jbXi3X</th>
                        <td>Front Door</td>
                        <td>Door Monitor</td>
                        <td><a href="#">Liam T.</a></td>
                        <td>
                            <button type="button" className="btn btn-primary">Edit Asset</button>
                            <button type="button" className="btn btn-danger">Delete Asset</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">jbXi3X</th>
                        <td>Front Door</td>
                        <td>Door Monitor</td>
                        <td><a href="#">Liam T.</a></td>
                        <td>
                            <button type="button" className="btn btn-primary">Edit Asset</button>
                            <button type="button" className="btn btn-danger">Delete Asset</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Assets;