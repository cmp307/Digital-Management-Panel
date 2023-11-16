import { ObjectId } from "mongodb";
import { Asset } from "../Asset";
import { IParentHardware, ISoftwareAsset } from "../../../interfaces/Asset";

export class SoftwareAsset extends Asset implements ISoftwareAsset {
    public _id: ObjectId;
    public name: string;
    public version: string;
    public manufacturer: string;
    public parent_hardware: IParentHardware | undefined;

    constructor(props: SoftwareAsset) {
        super(props);
        this._id = props._id;
        this.name = props.name;
        this.manufacturer = props.manufacturer;
        this.version = props.version;
        this.parent_hardware = (props.parent_hardware) ? {
            id: props.parent_hardware.id,
            date: props.parent_hardware.date
        } : undefined;
    }
}