import { Link } from 'react-router-dom';
import '../styles/TopBar.scss'
import { Component } from 'react';

class TopBar extends Component<{ heading?: string, linkToHomepage?: boolean }> {
    render() {
        const component = (
            <>
                <img src="https://i.imgur.com/ZIL6Yos.png" />
                <h1>Scottish Glen</h1>
                <h3 className="header-2" data-testid="page-title">{(this.props.heading) ? this.props.heading : 'Asset & Employee Management Panel'}</h3>
            </>
        )
        
        if(this.props.linkToHomepage == false) return <div id="header">{component}</div>;
        return <div id="header"><Link role='link' to={'/'}>{component}</Link></div>
    }
}

export default TopBar;