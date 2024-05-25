import { Routes } from "@angular/router";
import { CustomerTableComponent } from "./customer-table/customer-table.component";
import { CounterListComponent } from "./counter-list/counter-list.component";

export const routes: Routes = [
  { path: "counterList", component: CounterListComponent },
  { path: "customers", component: CustomerTableComponent },
  //   { path: "", redirectTo: "/", pathMatch: "full" },
  //   { path: "**", redirectTo: "/" },
];
