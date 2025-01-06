import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeRouting } from './home.routing';
import { AccueilComponent } from './accueil/accueil.component';
import { ProprieteComponent } from './propriete/propriete.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
<<<<<<< HEAD
=======
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
>>>>>>> c3282498850611a3c303d59ae814909053e0266a



@NgModule({
  declarations: [
    AccueilComponent,
<<<<<<< HEAD
    ProprieteComponent
=======
    ProprieteComponent,
    ServiceComponent,
    ContactComponent
>>>>>>> c3282498850611a3c303d59ae814909053e0266a
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(homeRouting)
  ]
})
export class HomeModule { }
