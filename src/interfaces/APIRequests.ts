export namespace APIResponse {
    export interface CreateEmployee { 
        forename: string;
        surname: string;
        department: string;
        password: string;
        confirmPassword: string;
    }
}