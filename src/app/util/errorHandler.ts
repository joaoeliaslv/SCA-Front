import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

export function error400AsString(response: HttpErrorResponse, invalidString: string): string
{
  const error = response.error;
  const errorArr = error.errors;

  if (errorArr && Array.isArray(errorArr))
  {
    let ret = '';

    errorArr.forEach(value =>
    {
      if (value.field)
      {
        ret = ret + '- ' + (value.field as string).toUpperCase() + ' ' + invalidString + ': ' + value.defaultMessage + '<br>';
      }
      else
      {
        ret = ret + '- ' + value.defaultMessage + '<br>';
      }
    });

    return ret;
  }

  return '';
}

export function handle400Error(obs: Observable<any>, toastr: ToastrService): void
{
  obs.subscribe(() => {}, err =>
  {
    console.error(err);
    const errorstr = error400AsString(err, 'inválido(a)');
    toastr.error(errorstr, 'Erro', { enableHtml: true });
  });
}
