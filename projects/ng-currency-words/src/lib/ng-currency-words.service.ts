import { Injectable } from '@angular/core';
import { NgCurrencyWordsOptions } from './ng-currency-words.interface';

@Injectable({
  providedIn: 'root',
})
export class NgCurrencyWordsService {
  private words = [
    [
      '',
      'один',
      'два',
      'три',
      'четыре',
      'пять',
      'шесть',
      'семь',
      'восемь',
      'девять',
      'десять',
      'одиннадцать',
      'двенадцать',
      'тринадцать',
      'четырнадцать',
      'пятнадцать',
      'шестнадцать',
      'семнадцать',
      'восемнадцать',
      'девятнадцать',
    ],
    ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
    ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
  ];

  public rubles(value: number, options: Partial<NgCurrencyWordsOptions> = {}) {
    let count, decimals, digit, length, numeral, parts;

    const mergedOptions: NgCurrencyWordsOptions = {
      currency_major_title: options.currency_major_title ?? ['рубль', 'рубля', 'рублей'],
      currency_gender: options.currency_gender ?? 'masculine',
      currency_minor_title: options.currency_minor_title ?? ['копейка', 'копейки', 'копеек'],
    };

    const type = typeof value;
    let numbers: string[];

    if (!value || (type !== 'number' && type !== 'string')) {
      return false;
    }

    if (typeof value === 'string') {
      value = this.toFloat(String(value).replace(',', '.'));

      if (isNaN(+value)) {
        return false;
      }
    }

    if (+value <= 0) {
      return false;
    }

    value = +value.toFixed(2);

    if (String(value).indexOf('.') !== -1) {
      numbers = String(value).split('.');
      value = +numbers[0];
      decimals = numbers[1];
    }

    numeral = '';
    length = String(value).length - 1;
    parts = '';
    count = 0;

    while (length >= 0) {
      digit = String(value).substr(length, 1);
      parts = digit + parts;
      if ((parts.length === 3 || length === 0) && !isNaN(this.toFloat(parts))) {
        numeral =
          this.parseNumber(parts, count, mergedOptions.currency_major_title, mergedOptions.currency_gender) + numeral;
        parts = '';
        count++;
      }
      length--;
    }
    numeral = numeral.replace(/\s+/g, ' ');

    if (decimals) {
      numeral += this.parseDecimals(String(this.toFloat(decimals)), mergedOptions);
    }
    return numeral;
  }

  private toFloat(value: string) {
    return parseFloat(value);
  }

  private plural(count: number, options: [string, string, string]) {
    if (options.length !== 3) {
      return false;
    }

    count = Math.abs(count) % 100;
    const rest = count % 10;

    if (count > 10 && count < 20) {
      return options[2];
    }

    if (rest > 1 && rest < 5) {
      return options[1];
    }

    if (rest === 1) {
      return options[0];
    }

    return options[2];
  }

  private parseNumber(number: string, count: number, titles: [string, string, string], gender: string) {
    let first, second;

    let numeral = '';

    if (number.length === 3) {
      first = number.substr(0, 1);
      number = number.substr(1, 3);
      numeral = '' + this.words[2][first] + ' ';
    }

    if (+number < 20) {
      numeral += '' + this.words[0][this.toFloat(number)] + ' ';
    } else {
      first = number.substr(0, 1);
      second = number.substr(1, 2);
      numeral += '' + this.words[1][first] + ' ' + this.words[0][second] + ' ';
    }
    if (+count === 0) {
      numeral += this.plural(+number, titles);
      if (gender !== 'masculine') {
        numeral = numeral.replace('один ', 'одна ').replace('два ', 'две ');
      }
    } else if (count === 1) {
      if (numeral !== '  ') {
        numeral += this.plural(+number, ['тысяча ', 'тысячи ', 'тысяч ']);
        numeral = numeral.replace('один ', 'одна ').replace('два ', 'две ');
      }
    } else if (count === 2) {
      if (numeral !== '  ') {
        numeral += this.plural(+number, ['миллион ', 'миллиона ', 'миллионов ']);
      }
    } else if (count === 3) {
      numeral += this.plural(+number, ['миллиард ', 'миллиарда ', 'миллиардов ']);
    }
    return numeral;
  }

  private parseDecimals(number: string, options: NgCurrencyWordsOptions) {
    number =
      +number === 0 ? 'ноль' : this.parseNumber(number, 0, options.currency_minor_title, options.currency_gender);

    return ' ' + number;
  }
}
