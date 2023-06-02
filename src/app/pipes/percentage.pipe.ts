import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'percentage'
})
export class PercentagePipe implements PipeTransform {
    transform(value: number, total: number): number {
        let percentage = 0;
        if (total !== 0) {
            percentage = (value / total) * 100;
        }
        return parseFloat(percentage.toFixed(2));
    }

}
