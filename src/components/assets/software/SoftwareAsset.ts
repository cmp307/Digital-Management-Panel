import { ObjectId } from "mongodb";
import { Asset } from "../Asset";
import { ISoftwareAsset } from "../../../interfaces/Asset";

export class SoftwareAsset extends Asset implements ISoftwareAsset {
    public _id: ObjectId;
    public name: string;
    public version: string;
    public manufacturer: string;
    public risk_level: string;
    public created_at: string;
    public last_edit_at: string;

    constructor(props: SoftwareAsset) {
        super(props);
        this._id = props._id;
        this.name = props.name;
        this.manufacturer = props.manufacturer;
        this.version = props.version;
        this.risk_level = props.risk_level;
        this.created_at = props.created_at;
        this.last_edit_at = props.last_edit_at;
    }
}