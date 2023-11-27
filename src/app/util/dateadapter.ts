import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {NativeDateAdapter} from '@angular/material/core';

export const APP_DATE_FORMATS =
  {
    parse: {
      dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
      dateInput: 'input',
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      // monthYearLabel: { year: 'numeric', month: 'numeric' },
      // monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
  };

export class AppDateAdapter extends NativeDateAdapter
{
  // tslint:disable-next-line:ban-types
  format(date: Date, displayFormat: Object): string
  {
    if (displayFormat === 'input')
    {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    return date.toDateString();
  }

  parse(value: any): Date | null
  {
    const date = moment(value, environment.dataformat);
    return date.isValid() ? date.toDate() : null;
  }
}
