import { Component, OnInit } from '@angular/core';
import { PageRequest, PayLoadRmp } from './model/payload-rmp.model';
import { RequestService } from './service/request.service';
import { Brand } from './model/brand.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public payLoade!:PayLoadRmp;
  public requests!:Request[];
  public brands!:Brand[];
  filterGroup!:FormGroup;
  errorMessage!:string;

  currentPage:number = 0;
  sizePage:number = 9;
  totalPages :number = 0;
  currentAction:string = "all";
  
  constructor(private resquestService:RequestService, private fb:FormBuilder, private route:ActivatedRoute, private router:Router){
   
  }

  ngOnInit(): void {
    this.resquestService.getBrands().subscribe(data=>(this.brands = data));
    this.getPageRequet();
    this.filterGroup=this.fb.group({
      nameCampaign:this.fb.control(null),
      brandSearch:this.fb.control(null),
    })
  }

  getPageRequet(){
    let index = this.currentPage*this.sizePage;
    this.resquestService.getRequest().subscribe({
      next: (data)=>{
        this.payLoade = data;
        this.totalPages =  Math.trunc(this.payLoade.requests.length / this.sizePage);
        if(this.payLoade.requests.length % this.sizePage != 0){
          this.totalPages++;
        }
        this.payLoade.requests = this.payLoade.requests.slice(index, index+this.sizePage);
      },
      error: (err)=>{
        this.errorMessage = err;
      }
    });
  }

  gotoNextPage(_t107: number) {
    this.currentPage = _t107;
    let index = this.currentPage*this.sizePage;
    if(this.currentAction === "all"){
      this.resquestService.getRequest().subscribe({
        next: (data)=>{
          this.payLoade = data;
          this.totalPages = Math.trunc(this.payLoade.requests.length / this.sizePage);
          if(this.payLoade.requests.length % this.sizePage != 0){
            this.totalPages++;
          }
          this.payLoade.requests = this.payLoade.requests.slice(index, index+this.sizePage);
        },
        error: (err)=>{
          this.errorMessage = err;
        }
      });
    }else{
      let name = this.filterGroup?.value.nameCampaign;
      let brand = this.filterGroup?.value.brandSearch;
      this.resquestService.campaignFilter( name,brand).subscribe({
        next: (data)=>{
          this.payLoade = data;
          this.totalPages =  Math.trunc(this.payLoade.requests.length / this.sizePage);
          if(this.payLoade.requests.length % this.sizePage != 0){
            this.totalPages++;
          }
          this.payLoade.requests = this.payLoade.requests.slice(index, index+this.sizePage);
        },
        error: (err)=>{
          this.errorMessage = err;
        }
      });
    }
  }

  
  handleFilter() {
    this.currentAction = "filter";
    this.gotoNextPage(0);
  }

  handleModify(_t41: HTMLDivElement) {
    this.router.navigateByUrl("/campagne-modify/"+_t41.id); 
  }
}
