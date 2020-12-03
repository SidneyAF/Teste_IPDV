export class User{
    user_id: number;
    name: string;
    office: string;
    phone: string;
    department: string;
    fk_department: number;

    constructor(){
        this.user_id = 1;
        this.name = '';
        this.office = '';
        this.phone = '';
        this.department = '';
        this.fk_department = 1;
    }

}
