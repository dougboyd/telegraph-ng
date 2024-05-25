import { Customer } from "./customer.model";

export interface CustomerResponse {
  total: number;
  customers: Customer[];
}
