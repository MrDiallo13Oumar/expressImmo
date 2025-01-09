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



@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TopBarComponent,
    FooterComponent,
    DeletePopupComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot(AppRouting),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
