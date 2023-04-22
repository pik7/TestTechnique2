import { Injectable } from '@angular/core';
import { Brand } from '../model/brand.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PageRequest, PayLoadRmp } from '../model/payload-rmp.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public _urlPayLoad = "/assets/payload-rmp.json";
  public _urlBrands = "/assets/brand.json";
  public _requestFilter!:Request[];
  public pLoade!:PayLoadRmp; 
  public pRequest!:PageRequest;
  constructor(private http:HttpClient) { 
    
   }
  getBrands():Observable<Brand[]>{
    return this.http.get<Brand[]>(this._urlBrands);
  }

  getRequest():Observable<PayLoadRmp>{
    return this.http.get<PayLoadRmp>(this._urlPayLoad);
  }

  campaignFilter(name:string, brand:string):Observable<PayLoadRmp>{
    this.getRequest().subscribe(pl=>(this.pLoade = pl));
    if(name && !brand){
      this.pLoade.requests = this.pLoade.requests.filter(req => (req.campaignName.includes(name) ));
    }else if(!name && brand ){
      this.pLoade.requests = this.pLoade.requests.filter(req => (req.brand.name == brand ));
    }else if(name && brand){
      this.pLoade.requests = this.pLoade.requests.filter(req => (req.campaignName.includes(name) && req.brand.name == brand ));
    }else{
      this.pLoade.requests = this.pLoade.requests.filter(req => (req.campaignName.includes("") || req.brand.name == "" ));
    }
      
    this.pLoade.totalVolume = this.pLoade.requests.length;
    return of(this.pLoade);
  }

  handleSearchRequest(id:number):Observable<PayLoadRmp>{
    this.getRequest().subscribe(pl=>(this.pLoade = pl));
    this.pLoade.requests = this.pLoade.requests.filter(req => (req.requestId == id ));
    return of(this.pLoade);
  }

}
