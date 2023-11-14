import { ObjectId } from "mongodb";

export interface Employee {
    _id: ObjectId;
    name: string;
    department: string;
    email: string;
}