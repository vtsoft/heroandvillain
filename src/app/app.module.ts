import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SuperhumanComponent } from './superhuman/superhuman.component';
import { SuperhumanService } from './superhuman/superhuman.service';
import { SupermenuComponent } from './supermenu/supermenu.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperhumanComponent,
    SupermenuComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule
  ],
  providers: [SuperhumanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
