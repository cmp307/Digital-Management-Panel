import { ObjectId } from "mongodb";

export interface Asset {
    name: string;
    model: string;
    manufacturer: string;
    type: string;
    ip: string;
    date: string;
    note: string;
    employee: number;
    _id: ObjectId;
}