import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeRouting } from './home.routing';
import { AccueilComponent } from './accueil/accueil.component';
import { ProprieteComponent } from './propriete/propriete.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { InscriptionSiteComponent } from './propriete/components/inscription-site/inscription-site.component';



@NgModule({
  declarations: [
    AccueilComponent,
    ProprieteComponent,
    ServiceComponent,
    ContactComponent,
    InscriptionSiteComponent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,

    RouterModule.forChild(homeRouting)
  ]
})
export class HomeModule { }
