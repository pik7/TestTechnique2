import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Brand } from '../model/brand.model';
import { PayLoadRmp } from '../model/payload-rmp.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../service/request.service';

declare var window:any;

@Component({
  selector: 'app-campagne-modify',
  templateUrl: './campagne-modify.component.html',
  styleUrls: ['./campagne-modify.component.css']
})
export class CampagneModifyComponent implements OnInit {

  modifyFormGroup!:FormGroup;
  mediaControl = ["Collaboration","New Product/innovation","Print","Radio","Sponsorship","Website","Labeling/Packaging","OOH","Promotions","Social Media","TVC/Online videos","Others"];
  brands!:Brand[];
  public payLoade!:PayLoadRmp;
  formModal:any;
  id!:string;
  constructor(private fb:FormBuilder,private route:ActivatedRoute, private router:Router, private resquestService:RequestService ) { 
    this.payLoade = this.router.getCurrentNavigation()?.extras.state as PayLoadRmp;
    this.id = this.route.snapshot.params['id'];
    this.resquestService.handleSearchRequest(parseInt(this.id)).subscribe(data =>(this.payLoade = data));
    this.resquestService.getBrands().subscribe(data =>(this.brands = data));
  }

  ngOnInit(): void {

    this.formModal = new window.bootstrap.Modal(
      document.getElementById("updateModal")
    );
    

    let testMedia = this.mediaControl.map(x => this.mediaControl.keys());
    let ownMedia = this.payLoade.requests[0].media.map(m => m.value);
    this.modifyFormGroup = this.fb.group({
      brandName:this.fb.control(this.payLoade.requests[0].brand.name),
      campainName:this.fb.control(this.payLoade.requests[0].campaignName),
      //media:this.fb.array([[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false]]),
      media: this.fb.array(
        this.mediaControl.map(x => ownMedia.indexOf(x)>-1)
      ),
      dateLineDecision:this.fb.control(null)
    });

    this.formModal.show();
  }

  handleModifyCampaign(){
    let validDate = this.modifyFormGroup?.value;
    this.router.navigateByUrl("/"); 
  }

  returnToCampaign() {
    this.router.navigateByUrl("/"); 
  }

}
