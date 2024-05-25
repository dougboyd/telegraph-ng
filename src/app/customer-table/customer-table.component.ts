import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { Customer } from "../ngRx/models/customer.model";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { AppState } from "../ngRx/core.state";
import { Store, select } from "@ngrx/store";
import {
  selectAllCustomer,
  selectCustomerTotal,
  selectCustomerError,
  selectCustomerLoading,
} from "../ngRx/customer/customer.selectors";
import { loadingCustomers } from "../ngRx/customer/customer.actions";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { Observable, merge, Subject, Subscription, of } from "rxjs";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AsyncPipe, CommonModule, DatePipe } from "@angular/common";

@Component({
  selector: "app-customer-table",
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: "./customer-table.component.html",
  styleUrls: ["./customer-table.component.scss"],
})
export class CustomerTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  // @ViewChild(MatSort, { static: false }) sort!: MatSort;
  // @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  public displayedColumns: string[] = [
    "id",
    "role",
    "firstName",
    "lastName",
    "amount",
  ];
  /*
  public noData: Customer[] = [<Customer>{}];
  public filterSubject = new Subject<string>();

  private filter: string = '';
  private subscription: Subscription = new Subscription();
  */
  // dataSource!: MatTableDataSource<Customer>;

  public loading!: boolean;
  public error$!: Observable<boolean>;
  public defaultSort: Sort = { active: "role", direction: "asc" };
  customers$!: Observable<Customer[]>;
  customerTotal$!: Observable<any>;
  customerTotal: number = 0;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.customerTotal$ = this.store.pipe(select(selectCustomerTotal));
    // this.customerTotal$.subscribe((x) => {
    // this.customerTotal = x.total;
    // console.log(x);
    // });
    this.customers$ = this.store.pipe(select(selectAllCustomer));
    // this.store.pipe(select(selectAllCustomer)).subscribe((customers) => {
    // console.log('here');
    // });
    // this.store
    // .pipe(select(selectAllCustomer))
    // .subscribe((customers) => this.initializeData(customers));
    /*
    
    this.store
      .pipe(select(selectCustomerTotal))
      .subscribe((total) => (this.customerTotal = total));
    this.subscription.add(
      this.store.pipe(select(selectCustomerLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );
    this.error$ = this.store.pipe(select(selectCustomerError));
  */
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadCustomers();
    }, 4000);
    /*
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    );

    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadCustomers()))
        .subscribe()
    );
    */
  }
  private loadCustomers(): void {
    console.log("in load customers");
    this.store.dispatch(
      loadingCustomers({
        params: {
          // filter: this.filter.toLocaleLowerCase(),
          filter: "",
          // pageIndex: this.paginator.pageIndex,
          pageIndex: 0,
          pageSize: 5,
          // pageSize: this.paginator.pageSize,
          sortDirection: "asc",
          sortField: "role",
        },
      })
    );
    /*
     */
  }

  private initializeData(customers: Customer[]): void {
    /*
    this.dataSource = new MatTableDataSource(
      customers.length ? customers : this.noData
    );
    */
  }
  public ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  /*
  public retry(): void {
    this.loadCustomers();
  }
  */
}
