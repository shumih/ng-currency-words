import { Pipe, PipeTransform } from '@angular/core';
import { NgCurrencyWordsOptions } from './ng-currency-words.interface';
import { NgCurrencyWordsService } from './ng-currency-words.service';

@Pipe({
  name: 'ngCurrencyWords',
})
export class NgCurrencyWordsPipe implements PipeTransform {
  constructor(private service: NgCurrencyWordsService) {}

  transform(value: number, options: Partial<NgCurrencyWordsOptions> = {}): string {
    return this.service.rubles(value, options);
  }
}
