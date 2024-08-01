import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from "../models/customer.model";
import { CustomerParams } from "../models/customer-params";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { CustomerResponse } from "../models/customer-response";
import { Opportunity } from "../models/opportunity.model";
import { Person } from "../models/person.model";

@Injectable()
export class IpService {
  constructor(private http: HttpClient) {}
  public getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }
}
