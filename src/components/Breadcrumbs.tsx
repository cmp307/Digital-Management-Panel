import { Link } from "react-router-dom";
import '../styles/Breadcrumbs.scss'
function Breadcrumbs(props:any) {
    return (
        <div id="breadcrumbs">
            <p><strong>Breadcrumbs »</strong> <Link to="/">Home</Link> / {props.path}</p>
        </div>
    )
}

export default Breadcrumbs;