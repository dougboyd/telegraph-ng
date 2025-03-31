import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class UxService {
  constructor(private httpClient: HttpClient) {}
  /*
  public getCustomers(params: CustomerParams): Observable<CustomerResponse> {
    // return this.httpClient.post<Customer[]>("localhost:4200/customers", params);
    return of(this.getFakeCustomers(params)).pipe(delay(2000));
  }

  private getFakeCustomers(params: CustomerParams): CustomerResponse {
    let data = <Customer[]>[];

    data = customers.filter(
      (c) =>
        ~c.role!.toLocaleLowerCase().indexOf(params.filter) ||
        ~c.firstName!.toLocaleLowerCase().indexOf(params.filter) ||
        ~c.lastName!.toLocaleLowerCase().indexOf(params.filter)
    );

    data.sort(
      (a, b) =>
        ((a as any)[params.sortField] > (b as any)[params.sortField] ? 1 : -1) *
        (params.sortDirection === "asc" ? 1 : -1)
    );

    return {
      // total: data.length,
      total: 7,
      customers: data.slice(
        params.pageIndex * params.pageSize,
        (params.pageIndex + 1) * params.pageSize
      ),
    };
  }
  */
}
