import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../ngRx/core.state";
import { selectCountList } from "../ngRx/counterList/counterList.selector";
import { changeName } from "../ngRx/counterList/counterList.actions";

@Component({
  selector: "app-counter-list",
  standalone: true,
  imports: [],
  templateUrl: "./counter-list.component.html",
  styleUrl: "./counter-list.component.css",
})
export class CounterListComponent {
  title = "Telegraph";

  selectCountList$!: Observable<any>;
  counterTest: string = "10";

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.selectCountList$ = this.store.select(selectCountList);

    setTimeout(() => {
      this.store.dispatch(changeName({ newName: "Doug" }));
    }, 1000);
  }
}
