import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformTime'
})
export class TransformTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Handle null or undefined input

    const inputDate = new Date(value);
    const formattedDate = this.formatDate(inputDate);
    const formattedTime = this.formatTime(inputDate);

    return `${formattedDate} ${formattedTime}`;
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();

    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  }

  private formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
      hours -= 12;
    }

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}${ampm}`;
  }
}
