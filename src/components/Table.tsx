const YourComponent = ({ data }) => {
    return (
        <div>
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
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.systemName}</td>
                            <td>{item.systemType}</td>
                            <td>{item.managedBy}</td>
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