import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Interceptor } from './interceptors/authenticated.interceptor.module';
import { Authorities } from './guards/authorities';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NotifierModule } from 'angular-notifier';
import { notifierConfigs } from './settings/notifier.settings';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule,
    Interceptor,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    NotifierModule.withConfig(notifierConfigs),
  ],
  providers: [Authorities],
  bootstrap: [AppComponent]
})
export class AppModule { }
