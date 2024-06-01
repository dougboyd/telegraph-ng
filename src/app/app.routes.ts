import { Routes } from "@angular/router";
import { CustomerTableComponent } from "./customer-table/customer-table.component";
import { CounterListComponent } from "./counter-list/counter-list.component";
import { DataViewComponent } from "./data-view/data-view.component";

export const routes: Routes = [
  { path: "counterList", component: CounterListComponent },
  { path: "customers", component: CustomerTableComponent },
  { path: "data-view", component: DataViewComponent },
  { path: "", redirectTo: "/data-view", pathMatch: "full" },
  { path: "**", redirectTo: "/" },
];
