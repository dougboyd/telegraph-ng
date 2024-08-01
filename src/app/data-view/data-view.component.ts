import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as d3 from "d3";
import { AppState } from "../ngRx/core.state";
import { setTestD3Data } from "../ngRx/telegraph/telegraph.actions";
import { Observable } from "rxjs";
import { selectTestD3Data } from "../ngRx/telegraph/telegraph.selectors";
import {
  selectActiveVisualisation,
  selectMainContentHeight,
  selectMainContentWidth,
} from "../ngRx/ux/ux.selectors";
import { Visualisation } from "../ngRx/models/visualisation";
import { RoundViewComponent } from "../visualisations/round-view/round-view.component";
import { RelationshipMapComponent } from "../visualisations/relationship-map/relationship-map.component";
import { AsyncPipe } from "@angular/common";
import { Router } from "@angular/router";
import { ForceGraphExampleComponent } from "../visualisations/force-graph-example/force-graph-example.component";

@Component({
  selector: "app-data-view",
  standalone: true,
  imports: [
    RoundViewComponent,
    RelationshipMapComponent,
    AsyncPipe,
    ForceGraphExampleComponent,
  ],
  templateUrl: "./data-view.component.html",
  styleUrl: "./data-view.component.css",
})
export class DataViewComponent implements OnInit {
  activeVisualisation$!: Observable<string>;
  activeVisualisation: string = "";

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.activeVisualisation$ = this.store.pipe(
      select(selectActiveVisualisation)
    );

    /**
    this.activeVisualisation$.subscribe((visualisation: string) => {
      // if(visualisation.name === 'roundView'){
      console.log("xxxx");
      console.log(visualisation);
      this.activeVisualisation = visualisation;
      this.router.navigateByUrl(visualisation);
      // }
    });
     */
  }
}
