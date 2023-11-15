// import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../../components/TopBar";
import '../../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AssetInfoTable from "../../components/tables/AssetInfoTable";
import { Asset as CAsset } from "../../components/Asset";
import { Employee } from "../../interfaces/Employee";
import Breadcrumbs from "../../components/Breadcrumbs";
class Asset extends Component<{ setUser: Function, user: Employee, id: string, navigate:NavigateFunction }, { setUser: Function, user: Employee, data?: CAsset }> {
    private _id: string;
    constructor(props: any) {
        super(props)
        this.state = {
            setUser: props.setUser,
            user: props.user,
            data: undefined
        }
        this._id = props.id
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:3001/api/asset/${this._id}`)
            .then((res) => res.json())
            .then((res) => new CAsset(res))
            .then((res) => this.setState({ data: res }))
            .catch((err) => console.error(err))
    }

    deleteAllAssets() {
        fetch('http://127.0.0.1:3001/api/delete-all-assets', { method: 'DELETE' }).then(() => {
            this.refreshPage();
        })
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Assets', path: '/assets' },
                    { name: this._id ?? '-', path: `/assets/${this._id}` },
                ]} setUser={this.props.setUser} username={this.props.user.email} />

                <h2 className="text-centre">Action Buttons</h2>
                <div id="action-buttons">
                    <Link to={`/edit/assets/${this._id}`} className="btn btn-outline-primary"><i className="fa fa-edit" /> Edit Asset</Link>
                    <button onClick={this.refreshPage} className="btn btn-outline-primary"><i className="fa fa-refresh" /> Refresh Asset</button>
                    <button onClick={this.deleteAllAssets} className="btn btn-outline-danger"><i className="fa fa-trash" /> Delete Asset</button>
                </div>
                <hr />
                <h2 className="text-centre">Full Asset Information</h2>
                <hr />
                <div id="centred-div">
                    {this.state.data ? <AssetInfoTable asset={this.state.data} /> : 'Loading...'}
                    <button className="btn btn-outline-primary" onClick={() => this.props.navigate('/assets')}>Return to assets page!</button>
                    <br /><br />
                </div>

            </>
        )
    }


}

export default ({ setUser, user }: { setUser: Function, user: Employee }) => {
    const { id } = useParams();
    const navigation = useNavigate();
    if (!id) throw new Error(`Invalid ID for Employee. Given: ${id}`);

    return <Asset setUser={setUser} user={user} id={id} navigate={navigation} />
};