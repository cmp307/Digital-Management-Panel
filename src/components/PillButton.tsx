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