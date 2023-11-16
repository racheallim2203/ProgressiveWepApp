import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformEndDate'
})
export class TransformEndDatePipe implements PipeTransform {
  transform(startDateTime: Date | string, durationInMinutes: number): string {
    // Ensure the start date-time is a Date object.
    const startDate = typeof startDateTime === 'string' ? new Date(startDateTime) : startDateTime;

    // Add the duration to the start date-time.
    const endDate = new Date(startDate.getTime() + (durationInMinutes * 60000)); // 60000ms per minute
    
    // Format the end date-time string.
    const month = (endDate.getMonth() + 1).toString().padStart(2, '0');
    const day = endDate.getDate().toString().padStart(2, '0');
    const year = endDate.getFullYear();
    const hours = endDate.getHours();
    const minutes = endDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12; // 0 should be displayed as 12

    // Construct the formatted end date-time string.
    const formattedDate = `${day}/${month}/${year} ${hours12}:${minutes}${ampm}`;

    return formattedDate;
  }
}