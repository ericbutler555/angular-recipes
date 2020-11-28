import { Pipe, PipeTransform } from '@angular/core';

// how to use in a component:
// {{ someVar | shorten }} (default character limit) or
// {{ someVar | shorten: 20 }} (custom character limit)

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit: number = 10): string {
    if (value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }
}
