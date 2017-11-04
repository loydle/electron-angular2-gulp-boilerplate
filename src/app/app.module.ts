import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
  AppComponent,
  ByteFormatPipe,
  HomeComponent,
  SidebarComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot([
  {
    path: 'home',
    component: HomeComponent
  }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  title = 'app';
}
