import { Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-async-spinner",
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: "./async-spinner.component.html",
  styleUrl: "./async-spinner.component.css",
})
export class AsyncSpinnerComponent {}
