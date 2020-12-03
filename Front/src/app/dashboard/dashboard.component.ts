import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/users.service';
import { DepartmentService } from '../../services/department.service';
import { CostCenterService } from '../../services/costCenter.service';
import { Department } from 'src/models/department.model';
import { CostCenter } from 'src/models/costCenter.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumnsUsers: string[] = ['position', 'name', 'phone', 'office', 'department', 'actions'];
  displayedColumnsDepartments: string[] = ['position', 'name', 'costCenter', 'action'];
  displayedColumnsCostCenter: string[] = ['position', 'name', 'action'];
  users: any;
  departments: any;
  costCenters: any;
  addUser: boolean = false;
  editUsers: boolean = false;
  editedUser: string = '';
  addDepartment: boolean = false;
  editDepartments: boolean = false;
  editedDepartments: string = '';
  addCostCenter: boolean = false;
  creatingCostCenter: boolean = false;
  editCostCenters: boolean = false;
  editedCostCenters: string = '';
  isReady: boolean = false;

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private costCenterService: CostCenterService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getDepartments();
    this.getCostCenter();
    this.isReady = true;
  }

  // Users
  getUsers(){
    this.userService.getUsers().then(data => {
      this.users = data;
    });
  }

  editUser(id: string){
    this.editedUser = id;
    this.editUsers = true;
  }

  updateUser (userId: number, name: string, phone: string, office: string, idDepartment: number){
    this.isReady = false;
    let payload = {
      name,
      office,
      phone,
      fk_department: idDepartment
    };
    this.userService.update(userId,payload).then(data =>{
      if (data.sucess){
        this.editedUser = '';
        this.editUsers = false;
        this.isReady = true;
        alert(' Alterado com sucesso ')
      }
    });
  }

  deleteUser(id: number){
    this.userService.delete(id).then(data => {
      if (data.sucess){
        this.users = this.users.filter((e: any) => e.user_id !== id)
      }
    });
  }

  newUser(){
    let user = new User();
    if(this.users.length > 0){
      user.user_id = (this.users[this.users.length-1].user_id + 1)
    }else{
      user.user_id = 1;
    }
    user.fk_department = 1;
    this.users.push(user)
    this.users = [...this.users];
  }

  cancelAddUser(userId: number){
    this.users = this.users.filter((e: any) => e.user_id !== userId)
  }

  createUser(userId: number, name: string, phone: string, office: string, idDepartment: number, department: string){
    let payload = {
      user_id: userId,
      name,
      office,
      phone,
      fk_department: idDepartment,
      department
    };

    this.userService.create(payload).then(data => {
      if (data.sucess){
        this.getUsers();
        this.addUser = false;
        this.editedUser = '';
        this.editUsers = false;
      }
    });
  }

  // Departments
  getDepartments(){
    this.departmentService.getDepartments().then(data => {
      this.departments = data;
    });
  }

  editDepartment(id: string){
    this.editedDepartments = id;
    this.editDepartments = true;
  }

  updateDepartment (departmentId: number, name: string, idCostCenter: number){
    this.isReady = false;
    let payload = {
      name,
      fk_costCenter: idCostCenter
    };
    this.departmentService.update(departmentId, payload).then(data =>{
      if (data.sucess){
        this.getUsers();
        this.editedDepartments = '';
        this.editDepartments = false;
        this.isReady = true;
        alert(' Alterado com sucesso ')
      }
    });
  }

  deleteDepartment(id: number){
    this.isReady = false;
    this.departmentService.delete(id).then(data => {
      if (data.sucess){
        this.departments = this.departments.filter((e: any) => e.department_id !== id);
        this.getUsers();
        this.isReady = true;
      }
    })
  }

  newDepartment(){
    let department = new Department();
    if(this.departments.length > 0){
      department.department_id = (this.departments[this.departments.length-1].department_id + 1)
    }else{
      department.department_id = 1;
    }
    this.departments.push(department)
    this.departments = [...this.departments];
  }

  cancelAddDepartment(departmentId: number){
    this.departments = this.departments.filter((e: any) => e.department_id !== departmentId)
  }

  createDepartment(departmentId: number, name: string, fk_costCenter: number, costCenter: string){
    let payload = {
      department_id: departmentId,
      name,
      fk_costCenter,
      costCenter
    };

    this.departmentService.create(payload).then(data => {
      if (data.sucess){
        this.getUsers();
        this.addDepartment = false;
        this.editedDepartments = '';
        this.editDepartments = false;
      }
    });
  }

  // Cost Center
  getCostCenter(){
    this.costCenterService.getCostCenter().then(data => {
      this.costCenters = data;
    });
  }
  

  editCostCenter (id: string){
    this.editedCostCenters = id;
    this.editCostCenters = true;
  }

  updateCostCenter (costCenterId: number, name: string){
    this.isReady = false;

    let payload = {
      name
    };

    this.costCenterService.update(costCenterId, payload).then(data => {
      if (data.sucess){
        this.editedCostCenters = '';
        this.editCostCenters = false;
        this.isReady = true;
        alert(' Alterado com sucesso ')
      }
    });
  }

  deleteCostCenter(id: number){
    this.isReady = false;
    this.costCenterService.delete(id).then(data => {
      if (data.sucess){
        this.costCenters = this.costCenters.filter((e: any) => e.costCenter_id !== id);
        this.isReady = true;
      }
    });
  }

  newCostCenter(){
    let costCenter = new CostCenter();
    if(this.costCenters.length > 0){
      costCenter.costcenter_id = (this.costCenters[this.costCenters.length-1].costcenter_id + 1)
    }else{
      costCenter.costcenter_id = 1;
    }
    this.costCenters.push(costCenter)
    this.costCenters = [...this.costCenters];
    this.creatingCostCenter = true;
  }

  cancelAddCostCenter(costCenter_id: number){
    this.costCenters = this.costCenters.filter((e: any) => e.costcenter_id !== costCenter_id)
  }

  createCostCenter(costcenter_id: number,name: string){
    this.isReady = false;
    let payload = {
      name,
      costcenter_id
    };

    this.costCenterService.create(payload).then(data => {
      if (data.sucess){
        this.getUsers();
        this.getDepartments();
        this.addCostCenter = false;
        this.editedCostCenters = '';
        this.editCostCenters = false;
        this.creatingCostCenter = false;
        this.isReady = true;
      }
    });
  }
}
