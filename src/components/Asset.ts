import { ObjectId } from "mongodb";
import { Asset as IAsset } from "../interfaces/Asset";

export class Asset implements IAsset {
    public _id: ObjectId;
    public name: string;
    public model: string;
    public date: string;
    public employee: ObjectId;
    public ip: string;
    public manufacturer: string;
    public note: string;
    public type: string;

    constructor(props: IAsset) {
        this._id = props._id;
        this.name = props.name;
        this.model = props.model;
        this.date = props.date;
        this.employee = props.employee;
        this.ip = props.ip;
        this.manufacturer = props.manufacturer;
        this.note = props.note;
        this.type = props.type;

    }

    public set setName(name: string) {
        this.name = name;
    }
}