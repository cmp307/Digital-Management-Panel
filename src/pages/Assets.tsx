import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";
import '../styles/Assets.scss';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Table from '../components/Table';

const tablePlaceholder = (
    <div className='table-placeholder'>
      <TextBlock rows={3} color='#CDCDCD'/>
    </div>
  );

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
        <Table isLoading={true} data={[]} />
            {/* <ReactPlaceholder ready={this.state.ready} customPlaceholder={<tablePlaceholder />}  */}
            {/* <table className="table table-striped">
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

                </tbody>
            </table> */}
        </>
    )
}

export default Assets;