import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShortenPipe } from './shared/shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
