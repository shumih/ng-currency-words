import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgCurrencyWordsModule} from "../../projects/ng-currency-words/src/lib/ng-currency-words.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgCurrencyWordsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
