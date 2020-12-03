export class Department{
    department_id: number;
    name: string;
    costCenter: string;
    fk_costCenter: number;

    constructor(){
        this.department_id = 0;
        this.name = '';
        this.costCenter = '';
        this.fk_costCenter = 1;
    }

}
