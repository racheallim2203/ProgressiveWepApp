import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

  // The name by which the pipe will be referred to within templates.
  name: 'transformName'
})
export class TransformNamePipe implements PipeTransform {

  /*The transform method is defined to take in a value parameter of type string and an additional optional 
  parameters args as an array of unknown type (denoted by the ...args syntax). It returns a transformed string. */

  transform(value: string, ...args: unknown[]): string {
    if (!value) return '';  // Check if value is not null or undefined

    // If value is valid, it is transformed to uppercase using the JavaScript toUpperCase() string method and then returned.
    return value.toUpperCase();
  }

}
