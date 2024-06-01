import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blockPrice',
  standalone: true,
  pure: true
})
export class BlockPricePipe implements PipeTransform {

  transform(value: number): number {
    if (typeof value !== 'number') {
      return NaN; // or you can handle it differently, e.g., return 0 or throw an error
    }
    const percentageValue = value * 0.2;
    return Math.round(percentageValue);
  }
}
