import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDuration'
})
export class TransformDurationPipe implements PipeTransform {
  transform(minutes: number): string {
    if (!minutes || isNaN(minutes)) return '';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hourText = hours === 1 ? 'hour' : 'hours';
    const minuteText = remainingMinutes === 1 ? 'minute' : 'minutes';

    return `${hours} ${hourText} ${remainingMinutes} ${minuteText}`;
  }
}
