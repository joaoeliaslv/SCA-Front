import { AbstractControl } from '@angular/forms';

export function stringComparatorUppercase(s1: string, s2: string): number
{
  return (s1.toUpperCase() > s2.toUpperCase()) ? 1 : -1;
}

export function stringComparatorUppercaseReversed(s1: string, s2: string): number
{
  return (s1.toUpperCase() > s2.toUpperCase()) ? -1 : 1;
}

export function _filter(value: string, toFilter: any[], key: string): any[] {
  const filterValue = value.toLowerCase();

  // @ts-ignore
  return toFilter.filter(option => option[key].toLowerCase().includes(filterValue));
}

export function hasValue(value: string, toFilter: any[], key: string): number
{
  let i = 0;
  for (const obj of toFilter)
  {
    if (obj[key].toString().toLowerCase() === value.toLowerCase())
    {
      return i;
    }

    i = i + 1;
  }

  return -1;
}
