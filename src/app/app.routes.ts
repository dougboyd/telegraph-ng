import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// import { CustomerTableComponent } from "./customer-table/customer-table.component";
// import { CounterListComponent } from "./counter-list/counter-list.component";
// import { DataViewComponent } from "./data-view/data-view.component";
// import { RoundViewComponent } from "./visualisations/round-view/round-view.component";
// import { RelationshipMapComponent } from "./visualisations/relationship-map/relationship-map.component";
// import { LoginComponent } from "./pages/login/login.component";
// import { SignupComponent } from "./pages/signup/signup.component";
// import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Uncommented to handle root path
  //   { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  //   { path: "signup", component: SignupComponent },
  //   {
  // path: "counterList",
  // component: CounterListComponent,
  // canActivate: [authGuard],
  //   },
  //   {
  // path: "customers",
  // component: CustomerTableComponent,
  // canActivate: [authGuard],
  //   },
  //   { path: "data-view", component: DataViewComponent, canActivate: [authGuard] },
  // { path: "roundview", component: RoundViewComponent },
  // { path: "relationship-map", component: RelationshipMapComponent },
  { path: '**', redirectTo: '/home' },
];