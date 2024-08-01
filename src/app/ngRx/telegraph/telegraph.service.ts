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
export class TelegraphService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the data (via post) for relationship map
   * @returns
   */
  public postRelationshipMapData(filter: any): Observable<any> {
    return this.httpClient.post(
      "http://localhost:8080/postRelationshipMapData",
      filter
    );
  }

  /**
   * Get standing data
   * @returns
   */
  public getStandingData(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/getStandingData");
  }

  /**
   * Get all nodes
   * @param opportunity
   * @returns
   */
  public getAllNodes(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/getAllNodes");
  }

  /**
   * Load all the persons from the database.
   * @param opportunity
   * @returns
   */
  public loadTestD3Data(): Observable<any> {
    return this.httpClient.post("http://localhost:8080/telegraphGraph", null);
  }

  /**
   * Load all the persons from the database.
   * @param opportunity
   * @returns
   */
  public loadPersons(): Observable<any> {
    return this.httpClient.post<Person[]>(
      "http://localhost:8080/loadPersons",
      null
    );
  }

  /**
   * Create an opportunity
   * @param opportunity
   * @returns
   */
  public createOpportunity(opportunity: Opportunity): Observable<any> {
    return this.httpClient.post<Opportunity>(
      "http://localhost:8080/createOpportunity",
      opportunity
    );
  }

  /**
   * Create a person
   * @param person
   * @returns
   */
  public createPerson(person: Person): Observable<any> {
    return this.httpClient.post<Person>(
      "http://localhost:8080/createPerson",
      person
    );
  }

  /**
   * Create a relationship
   * @param person
   * @returns
   */
  public createRelationship(formData: any): Observable<any> {
    return this.httpClient.post<any>(
      "http://localhost:8080/createRelationship",
      formData
    );
  }

  /*

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
