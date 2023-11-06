import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import TopBar from "../components/TopBar";

function Employees() {
    const [data, setData] = useState([] as any[]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/employees')
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error(err))
    }, []);

    console.log(data);

    return (
        <>
            <TopBar subtext="Employee Management Panel" />
            <Breadcrumbs history={[
                { name: 'Home', path: '/' },
                { name: 'Employees', path: '/employees' },
            ]} />
        </>
    )
}

export default Employees;