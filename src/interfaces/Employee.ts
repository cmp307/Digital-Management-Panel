import { ObjectId } from "mongodb";

export interface Employee {
    _id: ObjectId;
    forename: string;
    surname: string;
    department: string;
    email: string;
    password: string;
}