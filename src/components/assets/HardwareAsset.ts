import { ObjectId } from "mongodb";
import { Asset } from "./Asset";
import { IHardwareAsset } from "../../interfaces/Asset";

export class HardwareAsset extends Asset implements IHardwareAsset {
    public _id: ObjectId;
    public name: string;
    public model: string;
    public date: string;
    public parent_employee: ObjectId;
    public ip: string;
    public manufacturer: string;
    public note: string;
    public type: string;

    constructor(props: HardwareAsset) {
        super(props);
        this._id = props._id;
        this.name = props.name;
        this.model = props.model;
        this.date = props.date;
        this.parent_employee = props.parent_employee;
        this.ip = props.ip;
        this.manufacturer = props.manufacturer;
        this.note = props.note;
        this.type = props.type;

    }

    public set setName(name: string) {
        this.name = name;
    }
}