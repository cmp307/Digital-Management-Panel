const { ObjectId } = require('mongodb');

export interface Asset {
    _id: ObjectId;
    id: string;
    managedBy: string;
    systemName: string;
    systemType: string;
}