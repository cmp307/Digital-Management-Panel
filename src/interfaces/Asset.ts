import { ObjectId } from "mongodb";

export interface IAsset {
    _id: ObjectId;
    name: string;
    manufacturer: string;
}

export interface IHardwareAsset extends IAsset {
    model: string;
    type: string;
    ip: string;
    date: string;
    note: string;
    parent_employee: ObjectId;
}

export interface ISoftwareAsset extends IAsset {
    version: string;
    manufacturer: string;
    parent_hardware?: IParentHardware
}

export interface IParentHardware {
    id: ObjectId;
    date: string;
}