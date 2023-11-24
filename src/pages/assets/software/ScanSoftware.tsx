// import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../../../components/TopBar";
import '../../../styles/Assets.scss';
import "react-placeholder/lib/reactPlaceholder.css";
import { Component } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { IEmployee } from "../../../interfaces/Employee";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { Internal_NVD_API_Response } from "../../../interfaces/NVD";
import { default as cvss } from 'cvss';
import PillButton from "../../../components/PillButton";
import ClipLoader from "react-spinners/ClipLoader";

class ScanSoftware extends Component<{ setUser: Function, user: IEmployee, id: string, navigate: NavigateFunction }, { setUser: Function, user: IEmployee, vuln_data?: Internal_NVD_API_Response, total_vulnerabilities: { all: number, critical: number }, seconds_elapsed: number, error: any }> {
    private _id: string;
    constructor(props: any) {
        super(props)
        this.state = {
            setUser: props.setUser,
            user: props.user,
            vuln_data: undefined,
            total_vulnerabilities: {
                all: 0,
                critical: 0
            },
            seconds_elapsed: 0,
            error: undefined,
        }
        this._id = props.id
    }

    componentDidMount() {
        console.log(`fetching /assets/software/${this._id}/scan`);
        const _interval = setInterval(() => {

            this.setState({ seconds_elapsed: (this.state.seconds_elapsed ?? 0) + 1 });
        }, 1000);
        fetch(`http://127.0.0.1:3001/api/assets/software/${this._id}/scan`)
            .then((res) => { if (res.status == 500) { this.setState({ error: 'There was an error whilst trying to perform this vulnerability scan!' }); return res; } else { return res; } })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    vuln_data: res,
                    total_vulnerabilities: {
                        all: res.allVulnerabilitites.length,
                        critical: res.critical.totalResults
                    }
                });
                clearInterval(_interval);
            })
            .catch((err) => {
                console.error('logg err', err);
                clearInterval(_interval);
            })
    }

    refreshPage() {
        window.location.reload();
    }

    getColour(score?: number) {
        if (score) {
            if (score >= 9) return 'bg-danger';
            if (score >= 7) return 'border-danger';
            if (score >= 4) return 'border-warning';
            if (score >= 0.1) return 'border-primary';
        }
        return 'border-secondary';
    }

    private getDomain(url: any) {
        var parsedUrl = new URL(url);

        var hostname = parsedUrl.hostname;

        var parts = hostname.split('.');

        if (parts.length > 2) {
            return parts[parts.length - 2] + '.' + parts[parts.length - 1];
        } else {
            return hostname;
        }
    }

    generateTable(type: "critical" | "high") {
        if (type == 'critical') return;
    }

    render() {
        console.log(this._id);
        console.log(this.state);
        return (
            <>
                <TopBar />
                <Breadcrumbs history={[
                    { name: 'Home', path: '/' },
                    { name: 'Software Assets', path: '/software' },
                    { name: this._id ?? '-', path: `/software/${this._id}` },
                    { name: 'Scan', path: `/software/${this._id}/scan` },
                ]} setUser={this.props.setUser} user={this.props.user} />
                <div className="hero">
                    <div id="spacer"></div>
                    <h2 className="text-centre"><i className="fa fa-wrench" /> Vulnerability Scan Asset</h2>
                    <hr />
                </div>
                {(this.state.error) ?
                    <>
                        <div className="alert alert-danger" role="alert">
                            Error occured whilst Vulnerability Scanning!
                            <hr />
                            {this.state.error}
                        </div>
                    </>

                    : <>
                        <div className="text-centre">
                            {((this.state.vuln_data && this.state.vuln_data?.allVulnerabilitites)) ?
                                <>
                                    <h1 style={{ color: '#2ecc71' }}><i className="fa fa-check-square" /> Vulnerability Scan Complete!</h1>
                                    <p>There is <strong>{this.state.total_vulnerabilities.all}</strong> {(this.state.total_vulnerabilities.all > 1 || this.state.total_vulnerabilities.all == 0) ? 'vulnerabilities' : 'vulnerability'} (<code><strong>{this.state.total_vulnerabilities.critical} critical</strong></code>) contained within this scan.</p>
                                </>
                                : <>
                                    <ClipLoader
                                        color={'#3498db'}
                                        size={50}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                    <p>The vulnerability scan is in progress!</p>
                                    <p>This may take a while!</p>
                                    <p>This scan has taken <strong>{this.state.seconds_elapsed}</strong> seconds!</p>
                                </>}
                        </div>

                        <div id="centred-div" className="vuln-data">
                            {this.state.vuln_data?.allVulnerabilitites.map((x) => {
                                if (!x.cve.metrics.cvssMetricV30) return <></>;
                                const vec_string = x.cve.metrics.cvssMetricV30[0].cvssData.vectorString;
                                const vec_score = cvss.getAll(vec_string) as any;
                                const date = new Date(x.cve.published);

                                return <div className={"card mb-3 bg-light"} id={x.cve.id}>
                                    <div className="card-header">
                                        <div id="float-left">
                                            <p><PillButton label={cvss.getRating(vec_score.base.score)} substring={"/ " + vec_score.base.score} /></p>
                                        </div>
                                        <div>
                                            {(vec_score.base.rating == 'Critical') ?
                                                <p className="red-text"><i className="fa fa-exclamation-circle" /> {x.cve.id}</p> : <p>{x.cve.id}</p>}
                                        </div>
                                        <div id="float-right">
                                            <p><i className="fa fa-calendar" /> <strong>Published</strong>: {date.toLocaleDateString()} ({date.toLocaleTimeString()})</p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div id="description">
                                            <h5 className="card-title"><i className="fa fa-align-left" /> Vulnerability Description</h5>
                                            <hr />
                                            {
                                                x.cve.descriptions.map(x => {
                                                    if (x.lang == 'en') return <p className="card-text">{x.value}</p>
                                                })
                                            }
                                            <hr />
                                            <div id="scores">
                                                <p><strong>CVSS<sup>v3</sup> Vector String</strong>:</p>
                                                <p>{vec_string}</p>
                                            </div>

                                        </div>

                                        <div>
                                            <p><i className="fa fa-paper-plane" /> <strong>Source</strong>: {x.cve.sourceIdentifier}</p>

                                            <div id="weaknesses">
                                                {
                                                    (x.cve.weaknesses) ?
                                                        <>
                                                            <p><i className="fa fa-lock" /> <strong>Common Weakness Enumerations</strong> (CWE):</p>
                                                            {x.cve.weaknesses.map(x => {
                                                                const description = x.description.map(x => {
                                                                    if (x.lang == 'en') return x.value
                                                                }).join('\n');
                                                                return <><a target="_blank" href={"https://cwe.mitre.org/data/definitions/" + description.replace(/^\D+/g, '') + ".html"}><i className="fa fa-external-link" />{description}</a><br /></>
                                                            })}
                                                        </>
                                                        : <p></p>
                                                }
                                            </div>

                                            <div id="references">
                                                {
                                                    (x.cve.references) ?
                                                        <>
                                                            <p><i className="fa fa-link" /> <strong>External References:</strong></p>
                                                            {x.cve.references.map(x => {
                                                                return <><a href={x.url} target="_blank"><i className="fa fa-external-link" />{this.getDomain(x.url)}</a><br /></>
                                                            })}
                                                        </>
                                                        : <p></p>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-footer">
                                        {/* <a href="#" target="_blank">Mark as Completed</a> */}
                                        <Link role="button" to={'https://nvd.nist.gov/vuln/detail/' + x.cve.id} target="_blank" className="btn btn-outline-primary"><i className="fa fa-external-link" /> View on National Vulnerability Database</Link>
                                        <button className="btn btn-outline-danger" onClick={() => {
                                            const totalVulns = this.state.total_vulnerabilities;

                                            totalVulns.all = totalVulns.all - 1;
                                            if (this.state.vuln_data?.critical.vulnerabilities.map(x => x.cve.id).includes(x.cve.id)) {
                                                totalVulns.critical = totalVulns.critical - 1;
                                            }

                                            document.getElementById(x.cve.id)?.remove();
                                            this.setState({ total_vulnerabilities: totalVulns });
                                        }}><i className="fa fa-trash" /> Delete CVE from Scan</button>
                                    </div>
                                </div >;
                            })
                            }
                        </div>
                    </>}

                <div id="centred-div">
                    <button className="btn btn-outline-primary" onClick={() => this.props.navigate(-1)}><i className="fa fa-undo" /> Return to previous page!</button>
                    <br />
                </div>
            </>
        )
    }


}

export default ({ setUser, user }: { setUser: Function, user: IEmployee }) => {
    const { id } = useParams();
    const navigation = useNavigate();
    if (!id) throw new Error(`Invalid ID for Software Asset Scan. Given: ${id}`);

    return <ScanSoftware setUser={setUser} user={user} id={id} navigate={navigation} />
};