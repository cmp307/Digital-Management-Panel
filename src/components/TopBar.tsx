import { Link } from 'react-router-dom';
import '../styles/TopBar.scss'
import { Component } from 'react';

class TopBar extends Component<{ heading?: string }> {
    render() {
        return (
            <div id="header">
                <Link to={'/'}>
                    <img src="https://i.imgur.com/ZIL6Yos.png" />
                    <h1>Scottish Glen</h1>
                    <h3 className="header-2">{(this.props.heading) ? this.props.heading : 'Asset & Employee Management Panel'}</h3>
                </Link>
            </div>
        )
    }
}

export default TopBar;