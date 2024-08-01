import { Component, Input, OnInit } from "@angular/core";
import * as d3 from "d3";
import { Observable } from "rxjs";
import { AppState } from "../../ngRx/core.state";
import { Store, select } from "@ngrx/store";
import { postRelationshipMapData } from "../../ngRx/telegraph/telegraph.actions";
import { selectRelationshipMapData } from "../../ngRx/telegraph/telegraph.selectors";
import {
  selectMainContentHeight,
  selectMainContentWidth,
} from "../../ngRx/ux/ux.selectors";

@Component({
  selector: "app-relationship-map",
  standalone: true,
  imports: [],
  templateUrl: "./relationship-map.component.html",
  styleUrl: "./relationship-map.component.css",
})
export class RelationshipMapComponent implements OnInit {
  @Input() name!: string;

  containerHeight$!: Observable<number>;
  containerWidth$!: Observable<number>;
  containerWidth = 0;
  containerHeight = 0;
  relationshipMapData$!: Observable<any>;
  reloadRelationships$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  getDivSizing() {
    return (
      "height: " +
      this.containerHeight +
      "px; width: " +
      this.containerWidth +
      "px"
    );
  }

  ngOnInit() {
    // pull the relationship map json from the springboot layer
    setTimeout(() => {
      // this.store.dispatch(postRelationshipMapData({ filter: {} }));
    });

    this.containerHeight$ = this.store.pipe(select(selectMainContentHeight));
    this.containerHeight$.subscribe((height) => {
      this.containerHeight = height;
    });

    this.containerWidth$ = this.store.pipe(select(selectMainContentWidth));
    this.containerWidth$.subscribe((width) => {
      this.containerWidth = width;
    });

    this.relationshipMapData$ = this.store.pipe(
      select(selectRelationshipMapData)
    );

    // fire off the graph
    this.relationshipMapData$.subscribe((data: any) => {
      d3.selectAll("svg").remove();
      if (data.nodes) {
        this.drawGraph(data);
        // } else {
        // d3.selectAll("g").remove();
      }

      // setTimeout(() => {
      // var div = d3.selectAll("g").remove();
      // }, 3000);
    });
  }

  /**
   * Draw the graph with the data from relationshipMapData in the NGRX layer
   */
  drawGraph(oDataset) {
    if (oDataset.nodes === undefined) {
      return;
    }

    const dataset = structuredClone(oDataset);

    let margin = { top: 30, right: 80, bottom: 5, left: 5 };
    let width = this.containerWidth - margin.left - margin.right;
    let height = this.containerHeight - margin.top - margin.bottom;

    let colorScale = d3
      .scaleOrdinal() //=d3.scaleOrdinal(d3.schemeSet2)
      .domain(["Team A", "Person", "Opportunity", "Team D", "Team E"])
      .range(["#ff9e6d", "#86cbff", "#c2e5a0", "#fff686", "#9e79db"]);

    //create a simulation for an array of nodes, and compose the desired forces.
    let simulation = d3
      .forceSimulation(dataset.nodes)
      .force(
        "link",
        d3
          .forceLink(dataset.links) // This force provides links between nodes
          .id((d) => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
          .distance(220)
      )
      .force("charge", d3.forceManyBody().strength(-200)) // This adds repulsion (if it's negative) between nodes.
      .force("center", d3.forceCenter(width / 2, height / 2)); // This force attracts nodes to the center of the svg area

    // myChart={
    // const div = html`<div style='max-width: 900px; overflow-x: auto; padding: 0px; margin: 0px;'></div>`;

    const svg = d3
      .select("#viz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //appending little triangles, path object, as arrowhead
    //The <defs> element is used to store graphical objects that will be used at a later time
    //The <marker> element defines the graphic that is to be used for drawing arrowheads or polymarkers on a given <path>, <line>, <polyline> or <polygon> element.
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10") //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
      .attr("refX", 33) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 13)
      .attr("markerHeight", 13)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#999")
      .style("stroke", "none");

    // Initialize the links
    const link = svg
      .selectAll(".links")
      .data(dataset.links)
      .enter()
      .append("line")
      .attr("class", "links")
      .attr("marker-end", "url(#arrowhead)"); //The marker-end attribute defines the arrowhead or polymarker that will be drawn at the final vertex of the given shape.

    //The <title> element provides an accessible, short-text description of any SVG container element or graphics element.
    //Text in a <title> element is not rendered as part of the graphic, but browsers usually display it as a tooltip.
    link.append("title").text((d) => d.label);

    const edgepaths = svg
      .selectAll(".edgepath") //make path go along with the link provide position for link labels
      .data(dataset.links)
      .enter()
      .append("path")
      .attr("class", "edgepath")
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .attr("id", function (d, i) {
        return "edgepath" + i;
      })
      .style("pointer-events", "none");

    const edgelabels = svg
      .selectAll(".edgelabel")
      .data(dataset.links)
      .enter()
      .append("text")
      .style("pointer-events", "none")
      .attr("class", "edgelabel")
      .attr("id", function (d, i) {
        return "edgelabel" + i;
      })
      .attr("font-size", 10)
      .attr("fill", "#aaa");

    edgelabels
      .append("textPath") //To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
      .attr("xlink:href", function (d, i) {
        return "#edgepath" + i;
      })
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr("startOffset", "50%")
      .text((d) => d.type);

    // Initialize the nodes
    const node = svg
      .selectAll(".nodes")
      .data(dataset.nodes)
      .enter()
      .append("g")
      .attr("class", "nodes")
      .call(
        d3
          .drag() //sets the event listener for the specified typenames and returns the drag behavior.
          .on("start", dragstarted) //start - after a new pointer becomes active (on mousedown or touchstart).
          .on("drag", dragged) //drag - after an active pointer moves (on mousemove or touchmove).
        //.on("end", dragended)     //end - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).
      );

    node
      .append("circle")
      .attr("r", (d) => 30) //+ d.runtime/20 )
      .style("stroke", "grey")
      .style("stroke-opacity", 0.3)
      .style("stroke-width", (d) => d.runtime / 10)
      .style("fill", (d) => colorScale(d.label));

    node
      .append("title")
      .text(
        (d) =>
          d.id +
          ": " +
          d.label +
          " - " +
          d.group +
          ", runtime:" +
          d.runtime +
          "min"
      );

    node
      .append("text")
      .attr("dy", 4)
      .attr("dx", -15)
      .text((d) => d.name);
    node
      .append("text")
      .attr("dy", 16)
      .attr("dx", -0)
      .text((d) => d.rank);

    //Listen for tick events to render the nodes as they update in your Canvas or SVG.
    simulation.nodes(dataset.nodes).on("tick", ticked);
    simulation.force("link").links(dataset.links);

    // This function is run at each iteration of the force algorithm, updating the nodes position (the nodes data array is directly manipulated).
    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);

      edgepaths.attr(
        "d",
        (d) =>
          "M " +
          d.source.x +
          " " +
          d.source.y +
          " L " +
          d.target.x +
          " " +
          d.target.y
      );
    }

    //When the drag gesture starts, the targeted node is fixed to the pointer
    //The simulation is temporarily “heated” during interaction by setting the target alpha to a non-zero value.
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart(); //sets the current target alpha to the specified number in the range [0,1].
      d.fy = d.y; //fx - the node’s fixed x-position. Original is null.
      d.fx = d.x; //fy - the node’s fixed y-position. Original is null.
    }

    //When the drag gesture starts, the targeted node is fixed to the pointer
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    //the targeted node is released when the gesture ends
    //   function dragended(d) {
    //     if (!d3.event.active) simulation.alphaTarget(0);
    //     d.fx = null;
    //     d.fy = null;

    //     console.log("dataset after dragged is ...",dataset);
    //   }

    //drawing the legend
    const legend_g = svg
      .selectAll(".legend")
      .data(colorScale.domain())
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${width},${i * 20})`);

    legend_g
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", colorScale);

    legend_g
      .append("text")
      .attr("x", 10)
      .attr("y", 5)
      .text((d) => d);

    //drawing the second legend
    const legend_g2 = svg
      .append("g")
      //.attr("transform", (d, i) => `translate(${width},${i * 20})`);
      .attr("transform", `translate(${width}, 120)`);

    legend_g2
      .append("circle")
      .attr("r", 5)
      .attr("cx", 0)
      .attr("cy", 0)
      .style("stroke", "grey")
      .style("stroke-opacity", 0.3)
      .style("stroke-width", 15)
      .style("fill", "black");
    legend_g2.append("text").attr("x", 15).attr("y", 0).text("long runtime");

    legend_g2
      .append("circle")
      .attr("r", 5)
      .attr("cx", 0)
      .attr("cy", 20)
      .style("stroke", "grey")
      .style("stroke-opacity", 0.3)
      .style("stroke-width", 2)
      .style("fill", "black");
    legend_g2.append("text").attr("x", 15).attr("y", 20).text("short runtime");

    // return div
    // }
  }
}
