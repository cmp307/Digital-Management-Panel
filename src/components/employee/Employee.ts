import { ObjectId } from "mongodb";
import { IEmployee } from "../../interfaces/Employee";

export class Employee implements IEmployee {
    public _id: ObjectId;
    public forename: string;
    public surname: string;
    public department: string;
    public email: string;
    public password: string;
    
    constructor(props: IEmployee) {
        this._id = props._id;
        this.forename = props.forename;
        this.surname = props.surname;
        this.department = props.department;
        this.email = props.email;
        this.password = props.password;
    }
}