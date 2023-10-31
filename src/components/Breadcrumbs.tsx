import { Link } from "react-router-dom";
import '../styles/Breadcrumbs.scss'
function Breadcrumbs({ data }: any) {
    const _data = data.map((x: any, key: number) => {
        if (key + 1 == data.length) return (<span key={key}>
            {x.name}
        </span>)

        return <>
            <Link to={x.path}>{x.name}</Link><a> / </a>
        </>
    });

    return (
        <div id="breadcrumbs">
            <p><strong>Breadcrumbs »</strong> {_data}</p>
        </div>
    )
}

export default Breadcrumbs;