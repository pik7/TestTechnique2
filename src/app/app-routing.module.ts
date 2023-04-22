import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampagneModifyComponent } from './campagne-modify/campagne-modify.component';

const routes: Routes = [
  {path : "campagne-modify/:id" , component : CampagneModifyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
