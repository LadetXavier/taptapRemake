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
import { TabComponent } from './UI/tab/tab.component';
import { TabsComponent } from './UI/tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    OptionComponent,
    KeyComponent,
    ResultComponent,
    TimerInSecPipe,
    TabComponent,
    TabsComponent
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
