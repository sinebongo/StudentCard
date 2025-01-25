import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GFormComponent } from './components/gform/gform.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ErrorComponent } from './components/error/error.component';
import { CardValidationComponent } from './components/card-validation/card-validation.component';



@NgModule({
  declarations: [
    AppComponent,
    GFormComponent,
    CardComponent,
    ErrorComponent,
    CardValidationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
