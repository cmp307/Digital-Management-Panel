import { TextBlock } from "react-placeholder/lib/placeholders"

const AssetInfoTable = ({ data }: any) => {
    if (!data) {
        return <TextBlock rows={3} color='#CDCDCD' />
    }

    return (
        <table id="single-asset-table" className="table">
            <tr>
                <th><i className="fa fa-id-card-o" />Unique Asset ID</th>
                <td>{data._id}</td>
            </tr>
            <tr>
                <th><i className="fa fa-pencil-square-o" /> Name</th>
                <td>{data.name ?? '-'}</td>
            </tr>
            <tr>
                <th><i className="fa fa-list-alt" /> Model</th>
                <td>{data.model ?? '-'}</td>
            </tr>
            <tr>
                <th><i className="fa fa-cogs" /> Manufacturer</th>
                <td>{data.manufacturer ?? '-'}</td>
            </tr>
            <tr>
                <th><i className="fa fa-exchange" /> Asset Type</th>
                <td>{data.type ?? '-'}</td>
            </tr>
            <tr>
                <th><i className="fa fa-wifi" /> IP Address</th>
                <td>{data.ip ?? '-'}</td>
            </tr>
            <tr>
                <th><i className="fa fa-user" /> Supervising Employee</th>
                <td><a href="#">Liam T.</a><code>(ID: {data.employee})</code></td>
            </tr>
            <tr>
                <th><i className="fa fa-calendar" /> Purchase Date</th>
                <td>{data.date} <code>(15 days ago)</code></td>
            </tr>
            <tr>
                <th><i className="fa fa-sticky-note-o" /> Note</th>
                <td>{data.note}</td>
            </tr>
        </table>
    )
}

export default AssetInfoTable;