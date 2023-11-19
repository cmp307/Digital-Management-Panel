export namespace APIResponse {
    export interface CreateEmployee { 
        forename: string;
        surname: string;
        department: string;
        password: string;
        confirmPassword: string;
    };
    export interface CreateAssetLink {
        software_id: string;
        hardware_id: string;
        date: string;
        created_by: string;
    }
    export interface DeleteHardwareLink {
        swid: string;
    }
}