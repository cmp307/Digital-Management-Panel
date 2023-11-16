import { ObjectId } from "mongodb";
import { IAsset } from "../../interfaces/Asset";

export class Asset implements IAsset {
    public _id: ObjectId;
    public name: string;
    public manufacturer: string;

    constructor(props: IAsset) {
        this._id = props._id;
        this.name = props.name;
        this.manufacturer = props.manufacturer;
    }

    public set setName(name: string) {
        this.name = name;
    }
}