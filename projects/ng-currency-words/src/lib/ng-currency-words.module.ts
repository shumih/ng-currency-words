import { NgModule } from '@angular/core';
import { NgCurrencyWordsPipe } from './ng-currency-words.pipe';

@NgModule({
  declarations: [NgCurrencyWordsPipe],
  exports: [NgCurrencyWordsPipe],
})
export class NgCurrencyWordsModule {}
