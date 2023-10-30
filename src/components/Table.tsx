import ReactPlaceholder from 'react-placeholder';

const YourComponent = ({ isLoading, data }) => {
    return (
        <div>
            <ReactPlaceholder
                showLoadingAnimation
                type="text"
                rows={5} // Adjust the number of rows as needed
                ready={!isLoading} // Control when the placeholder is shown or hidden
            >
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
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ReactPlaceholder>
        </div>
    );
};

export default YourComponent;