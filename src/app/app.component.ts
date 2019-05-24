import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { SearchPipe } from './searchPipe';
import { start } from 'repl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChildren("selectEmployee") selectEmployee: QueryList<ElementRef>;

  allSelectedRows:any=[];
  startNum:number=0;
  showPage:number=3;
  endNum:number=this.showPage;
  currentPage:number=1;
  employeeTable:any = [];
  totalPages:number;
  showAddFormFlag:boolean=false;
  maxId:number;
  newEmployee:any=[
    {
      "id":"",
      "employee_name":"",
      "employee_salary":"",
      "employee_age":"",
      "isEdit":false
    }
  ];
  constructor(){}

  ngOnInit(){
    this.employeeTable = [
      {"id":5161,"employee_name":"Derek Highland","employee_salary":20000,"employee_age":"23","isEdit":false},
      {"id":5162,"employee_name":"Ashwini Liman","employee_salary":30000,"employee_age":"23","isEdit":false},
      {"id":5163,"employee_name":"Quentin Derksen","employee_salary":15000,"employee_age":"23","isEdit":false},
      {"id":5165,"employee_name":"Camilla Bode","employee_salary":25000,"employee_age":"25","isEdit":false},
      {"id":5164,"employee_name":"Jamika Atchinson","employee_salary":2000,"employee_age":"23","isEdit":false},
      {"id":5166,"employee_name":"Felipe Atchley","employee_salary":10000,"employee_age":"23","isEdit":false},
      {"id":5160,"employee_name":"Thi Grigsby","employee_salary":35000,"employee_age":"23","isEdit":false},
    ];
    this.totalPages=parseInt(this.employeeTable.length);
    console.log()

  }

  // select all employee
  selectAll(event){
    if(event.target.checked){
      this.selectEmployee.forEach((element) => {
        element.nativeElement.checked = true;
      });
      for(let currentRow of this.employeeTable){
        this.allSelectedRows.push(currentRow);
      }

    }else{
      this.selectEmployee.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.allSelectedRows=[];
    }
  }

  // select checked employee
  selectedEmployee(selectedRow){
    this.allSelectedRows.push(selectedRow);
  }

  // delete selected employees
  deleteRows(){
    for(let selectedRows of this.allSelectedRows){
      for(let currentRows of this.employeeTable){
        if(selectedRows.id === currentRows.id){
          this.employeeTable.splice(this.employeeTable.indexOf(selectedRows),1);
        }
      }
    }
    if(this.employeeTable.length==0){
      this.totalPages=0;
    }
  }

  // Reset all employee records
  resetData(){
    this.ngOnInit()
  }

  // sort field
  sort(field,order){
    this.employeeTable.sort(this.sortField(field, order));
  }

  sortField(property,order) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    if(order=='ascending'){
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
    }else if(order=='descending'){
      return function (a,b) {
        var result = (b[property] < a[property]) ? -1 : (b[property] > a[property]) ? 1 : 0;
        return result * sortOrder;
    }
    }
  }

  // show next employee records
  nextRecords(lastNo){
    if(this.totalPages>=lastNo){
      this.startNum=lastNo;
      this.endNum=lastNo+this.showPage;
    }
  }

 // show previous employee records
  prevRecords(startNo){
    if(this.totalPages>=startNo){
      this.startNum=startNo-this.showPage;
      this.endNum=startNo;
    }
  }

  // show selected index employee records
  showCurrentPages(start){
    if(this.totalPages>=start){
    this.startNum=(start-1)*this.showPage;
    this.endNum=start*this.showPage;
    }
    this.currentPage=start;
  }

  // edit employee record
  editEmployee(empRecord){
    for(let empList of this.employeeTable){
      if(empList.id==empRecord.id){
        empList.isEdit=!empList.isEdit;
        empList.employee_name=empRecord.employee_name;
        empList.employee_salary=empRecord.employee_salary;
        empList.employee_age=empRecord.employee_age;
      }
    }
  }

  setPages(event){
    let val=parseInt(event.target.value);
    this.showPage=val;
    this.endNum=val;
    this.startNum=0;
  }

  // add Employee
  showAddForm(){
    this.showAddFormFlag=!this.showAddFormFlag;
  }
  
  addEmployee(emp){
    this.maxId=Math.max.apply(Math,this.employeeTable.map(function(emp){return emp.id;}));
    emp.id=this.maxId+1;
    this.employeeTable.push(emp);
    this.totalPages=this.employeeTable.length;
    this.startNum=0;
    this.endNum=this.showPage;
    this.showAddFormFlag=false;
    console.log(this.totalPages);
    console.log(this.showPage);
  }
}
