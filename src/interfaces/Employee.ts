import { ObjectId } from "mongodb";

export interface IEmployee {
    _id: ObjectId;
    forename: string;
    surname: string;
    department: string;
    email: string;
    password: string;
}