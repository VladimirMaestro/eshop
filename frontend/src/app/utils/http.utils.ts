import { HttpParams } from '@angular/common/http';
import { KeyValue } from '../models/key-value';
import { getEntriesWithNotNullishValues } from './collection.utils';

export class HttpUtils {
  /**
   * Create HttpParams instance from object. Uses object keys as parameter names and its values as parameter values.
   * Skip properties with nullish value.
   *
   * @param {Object} queryParams The source object.
   * @returns {Array<KeyValue>} Returns HttpParams instance create bases on source object keys/values.
   * @example
   *
   * const obj = { a: 1, b: null, c: '', d: false, e: 0 };
   * HttpUtils.createQueryParams(obj) // HttpParams instance, where HttpParams.toString() is 'a=1&c=&d=false&e=0'
   */
  static createQueryParams(queryParams: { [key: string]: any }): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    getEntriesWithNotNullishValues(queryParams).forEach((entry: KeyValue<any>) => {
      let key: string = entry.key;
      if (Array.isArray(entry.value)) {
        key = `${key}[]`;
      }
      httpParams = HttpUtils.buildParam(httpParams, key, entry.value);
    });
    return httpParams;
  }

  private static buildParam(httpParams: HttpParams, key: string, value: any): HttpParams {
    if (Array.isArray(value)) {
      value.forEach((param: HttpParams) => {
        httpParams = httpParams.append(key, param.toString());
      });
    } else {
      httpParams = httpParams.append(key, value.toString());
    }
    return httpParams;
  }
}
