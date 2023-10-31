import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";

function Employees() {
    return (
        <>
            <TopBar />
            <Breadcrumbs data={[
                { name: 'Home', path: '/' },
                { name: 'Employees', path: '/employees' },
            ]} />        </>
    )
}

export default Employees;