import { Component } from 'react';

class PillButton extends Component<{ label: string }> {
    render() {
        let style;

        switch (this.props.label.toLowerCase()) {
            case 'cctv camera':
                style = '#1abc9c'
                break;
            case 'workstation':
                style = '#2ecc71'
                break;
            case 'laptop':
                style = '#3498db'
                break;
            case 'mobile phone':
                style = '#9b59b6'
                break;
            case 'server':
                style = '#f1c40f'
                break;
            case 'firewall':
                style = '#e74c3c'
                break;
            case 'router':
                style = '#c0392b'
                break;
            case 'switch':
                style = '#95a5a6'
                break;
            case 'finance':
                style= '#786fa6'
                break;
            case 'human resources':
                style = '#63cdda'
                break;
            case 'operations':
                style = '#546de5'
                break;
            case 'sales':
                style = '#c44569'
                break;
            case 'information technology':
                style = '#f5cd79'
                break;
            case 'critical':
                style = '#c0392b'
                break;
            case 'high':
                style = '#e74c3c'
                break;
            case 'medium':
                style = '#f1c40f'
                break;
            case 'low':
                style = '#3498db'
                break;
            case 'n/a':
                style = '#bdc3c7'
                break;
            default:
                style = '#a29bfe'
                break;
        }
        return (
            <span className={'badge rounded-pill'} style={{ backgroundColor: style, color: 'white' }}>{this.props.label}</span>
        )
    }
}

export default PillButton;