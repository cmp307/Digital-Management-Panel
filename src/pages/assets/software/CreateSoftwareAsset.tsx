// import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../../../components/TopBar";
import '../../../styles/AssetsCreate.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IEmployee } from "../../../interfaces/Employee";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { HardwareAsset } from "../../../components/assets/hardware/HardwareAsset";
import Combobox from "react-widgets/Combobox";

class CreateSoftwareAsset extends Component<{ setUser: Function, user: IEmployee, navigate: NavigateFunction }, { data: HardwareAsset[], setUser: Function, user: IEmployee, form_data: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            setUser: props.setUser,
            user: props.user,
            form_data: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3001/api/assets/hardware/view-all')
            .then((res) => res.json())
            .then((res) => res.map((x: any) => new HardwareAsset(x)))
            .then((res) => this.setState({ data: res }))
            .catch((err) => console.error(err))
    }

    handleChange(key: string, value: any) {
        const curr = this.state.form_data;
        this.setState({ form_data: { ...curr, [key]: value } });
        console.log(this.state.form_data);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        console.log('FORM DATA = ', this.state.form_data);
        fetch(`http://127.0.0.1:3001/api/assets/software`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...this.state.form_data, risk_level: 'N/A' })
        }).then(() => {
            this.props.navigate(`/software`);
        })
        return false;
    }

    render() {
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Software Assets', path: '/software' },
                    { name: 'Create', path: '/software/create' },
                ]} setUser={this.state.setUser} username={this.state.user.email} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-cloud-download" /> Create a Software Asset</h2>
                    <hr />
                </div>

                <form id="asset-form" onSubmit={this.onSubmit}>
                    <div id="question">
                        <label htmlFor="name"><i className="fa fa-pencil-square-o" /> Asset Name<span className="red-star">*</span></label><br />
                        <Combobox
                            id="name"
                            name="name"
                            defaultValue={this.state.form_data?.name}
                            onChange={e => this.handleChange('name', e)}
                            placeholder="Please enter the name for your Asset."
                            hideCaret
                            data={['Windows 10', 'Windows 11', 'Windows 8.1', 'Windows 7']} />
                                                    {/* <input type="text" id="name" name="name" onChange={e => this.handleChange('name', e.target.value)} placeholder="Please enter the name for your Asset." required></input> */}
                    </div>
                    <div id="spacer"></div>

                    <div id="question">
                        <label htmlFor="manufacturer"><i className="fa fa-cogs" /> Asset Manufacturer</label><br />
                        <Combobox
                            id="name"
                            name="name"
                            defaultValue={this.state.form_data?.manufacturer}
                            onChange={e => this.handleChange('manufacturer', e)}
                            placeholder="Please enter the manufacturer for your Asset."
                            hideCaret
                            data={['Microsoft']} />
                    </div>
                    <div id="spacer"></div>

                    <div id="question">
                        <label htmlFor="name"><i className="fa fa-code-fork" /> Asset Version<span className="red-star">*</span></label><br />
                        <input type="text" id="name" name="name" onChange={e => this.handleChange('version', e.target.value)} placeholder="Please enter the name for your Asset." required></input>
                    </div>

                    {(this.state.form_data.manufacturer && this.state.form_data.name && this.state.form_data.version) ?
                        <div id="question">
                            <label htmlFor="cpe"><i className="fa fa-tasks" /> Common Platform Enumeration</label><br />
                            <input
                                type="text"
                                id="cpe"
                                name="cpe"
                                value={(
                                    "cpe:2.3:o:" +
                                    this.state.form_data.manufacturer.toLowerCase() + ':' +
                                    this.state.form_data.name.toLowerCase().replace(' ', '_') + ":" +
                                    this.state.form_data.version
                                )}
                                onChange={e => this.handleChange('cpe', e.target.value)}
                                required disabled></input>
                        </div> : <></>
                    }

                    <br />

                    <input type="submit"></input>
                    <button className="cancel" type="button" onClick={() => this.props.navigate(-1)}>Cancel</button>
                </form>
            </>
        )
    }
}

export default (props: any) => {
    const navigation = useNavigate();
    return <CreateSoftwareAsset {...props} navigate={navigation} />
};