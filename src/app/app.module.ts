import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ManagerComponent } from './manager/manager.component';

import { OptionComponent } from './option/option.component';
import { KeyComponent } from './option/key/key.component';
import { ResultComponent } from './manager/result/result.component';
import { TimerInSecPipe } from './timer-in-sec.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    OptionComponent,
    KeyComponent,
    ResultComponent,
    TimerInSecPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
