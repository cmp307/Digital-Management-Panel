const PillButton = ({ data }: any) => {
    let style;

    switch (data) {
        case 'CCTV Camera':
            style = '#1abc9c'
            break;
        case 'Workstation':
            style = '#2ecc71'
            break;
        case 'Laptop':
            style = '#3498db'
            break;
        case 'Mobile Phone':
            style = '#9b59b6'
            break;
        case 'Server':
            style = '#f1c40f'
            break;
        case 'Firewall':
            style = '#e74c3c'
            break;
        case 'Router':
            style = '#c0392b'
            break;
        case 'Switch':
            style = '#95a5a6'
            break;
        default:
            style = '#a29bfe'
            break;
    }
    return (
        <span className={'badge rounded-pill'} style={{ backgroundColor: style }}>{data}</span>
    )
}

export default PillButton;