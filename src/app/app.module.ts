import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app.routing';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DemoMaterialModule } from './demo-material-module';
import { DeletePopupComponent } from './shared/dialogs/delete-popup/delete-popup.component';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TopBarComponent,
    FooterComponent,
    DeletePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot(AppRouting),
    ToastrModule.forRoot({
      // Configuration de base de ngx-toastr
      timeOut: 3000, // Durée d'affichage (en ms)
      positionClass: 'toast-top-right', // Position par défaut des toasts
      preventDuplicates: true, // Évite les toasts en double
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ToastrModule],
})
export class AppModule { }
