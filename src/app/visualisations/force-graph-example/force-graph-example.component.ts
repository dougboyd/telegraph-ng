import { Component, Input, OnInit } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "app-force-graph-example",
  standalone: true,
  imports: [],
  templateUrl: "./force-graph-example.component.html",
  // styleUrl: "./relationship-map.component.css",
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `,
  ],
})
export class ForceGraphExampleComponent implements OnInit {
  @Input() name!: string;
  width: number = 0;
  height: number = 0;
  gridY = 60;
  gridX = 200;

  ngOnInit() {
    let filterOutSats = false;
    let that = this;
    let types = [
      { type: "HUB", color: "#1670b9cc", linkDistance: 200, charge: -8000 },
      { type: "SAT", color: "#faba02cc", linkDistance: 30, charge: -5000 },
      { type: "LNK", color: "#637b32cc", linkDistance: 200, charge: -8000 },
      { type: "LSAT", color: "#FF9800cc", linkDistance: 30, charge: -5000 },
    ];
    this.width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    this.height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.width = this.width - 20;
    this.height = this.height - 20;

    //let color = d3.scaleOrdinal(d3.schemeCategory10);

    d3.json("../assets/forceGraphExample.json").then(function (graph) {
      //transform for d3

      // set a height and width for each display node
      graph.nodes.forEach(function (d, i) {
        d.width = d.displayName.length * 7;
        d.height = 22;
      });

      // set the source and targets for the relationships
      graph.links = graph.edges;
      graph.links.forEach(function (d, i) {
        d.source = graph.nodes[d.source].name;
        d.target = graph.nodes[d.target].name;
      });

      if (filterOutSats) {
        graph.nodes = graph.nodes.filter((n) => n.type.indexOf("SAT") === -1);
        graph.links = graph.links.filter(
          (l) =>
            graph.nodes.find((n) => n.name === l.source) &&
            graph.nodes.find((n) => n.name === l.target)
        );
      }

      let label: any = {
        nodes: [],
        links: [],
      };

      graph.nodes.forEach(function (d, i) {
        label.nodes.push({ node: d });
        label.nodes.push({ node: d });
        label.links.push({
          source: i * 2,
          target: i * 2 + 1,
        });
      });

      let labelLayout: any = d3
        .forceSimulation(label.nodes)
        .force("charge", d3.forceManyBody().strength(0))
        .force("link", d3.forceLink(label.links).distance(0).strength(2));

      let graphLayout = d3
        .forceSimulation(graph.nodes)
        // the magentic charge to keep nodes apart
        .force(
          "charge",
          d3.forceManyBody().strength(function (d) {
            return getCharge(d);
          })
        )
        // keep whole graph centered
        .force(
          "center",
          d3.forceCenter(that.width / 2 - 100, that.height / 2 - 10)
        )
        // pull towards xy axis
        .force(
          "x",
          d3.forceX(that.width / 2 - 100).strength(that.height / 5000)
        )
        .force("y", d3.forceY(that.height / 2 - 10).strength(that.width / 5000))
        // set linkDistance and strength to enforce linkDistance
        .force(
          "link",
          d3
            .forceLink(graph.links)
            .id(function (d) {
              return d.name;
            })
            .distance(function (d) {
              return getLinkDistance(d);
            })
            .strength(1.5)
        )
        .alphaTarget(0)
        .velocityDecay(0.9)
        // .on("tick", ticked)
        .on("tick", function () {
          if (!node || !link) return;

          node.call(updateNode);
          link.call(updateLink);

          labelLayout.alphaTarget(0.3).restart();
          labelNode.each(function (d, i) {
            d.x = d.node.x + 5;
            d.y = d.node.y + 15;
          });
          labelNode.call(updateNode);
        })
        .on("end", ended);

      let adjlist = [];

      graph.edges.forEach(function (d) {
        adjlist[d.source.index + "-" + d.target.index] = true;
        adjlist[d.target.index + "-" + d.source.index] = true;
      });

      function neigh(a, b) {
        return a == b || adjlist[a + "-" + b];
      }

      let svg = d3
        .select("#viz")
        .attr("width", that.width)
        .attr("height", that.height);
      let container = svg.append("g");

      svg.call(
        d3
          .zoom()
          .scaleExtent([0.1, 4])
          .on("zoom", function (e) {
            container.attr("transform", e.transform);
          })
      );

      let link = container
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.edges)
        .enter()
        .append("line")
        .attr("stroke", "#aaa")
        .attr("stroke-width", "1px");

      let node = container
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("rect")
        .attr("width", function (d) {
          return d.width;
        })
        .attr("height", function (d) {
          return d.height;
        })
        .attr("stroke", "#CCC")
        .attr("stroke-width", ".5px")
        .attr("fill", function (d) {
          const type = types.find((c) => c.type === d.type);
          return type ? type.color : "#777";
        });
      node.on("mouseover", focus).on("mouseout", unfocus);

      node.call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

      let labelNode = container
        .append("g")
        .attr("class", "labelNodes")
        .selectAll("text")
        .data(label.nodes)
        .enter()
        .append("text")
        .text(function (d, i) {
          return i % 2 == 0 ? "" : d.node.displayName;
        })
        .style("fill", "#000")
        .style("font-family", "Arial")
        .style("font-size", 12)
        .style("pointer-events", "none"); // to prevent mouseover/drag capture

      node.on("mouseover", focus).on("mouseout", unfocus);

      /*
        function ticked() {
            if (!node || !link) return;

            node.call(updateNode);
            link.call(updateLink);

            labelLayout.alphaTarget(0.3).restart();
            labelNode.each(function(d, i) {
                d.x = d.node.x + 5;
                d.y = d.node.y + 15;
            });
            labelNode.call(updateNode);
        }
            */

      function ended() {
        console.log("ended!");
      }

      function fixna(x) {
        if (isFinite(x)) return x;
        return 0;
      }

      function focus(e, d) {
        let index = d.index;
        // let index = d3.select(d3.event.target).datum().index;
        node.style("opacity", function (o) {
          return neigh(index, o.index) ? 0.8 : 0.4;
        });
        labelNode.style("opacity", function (o) {
          return neigh(index, o.node.index) ? 1 : 0.4;
        });
        link.style("opacity", function (o) {
          return o.source.index == index || o.target.index == index ? 0.8 : 0.1;
        });
      }

      function unfocus() {
        labelNode.style("opacity", 0.8);
        node.style("opacity", 0.8);
        link.style("opacity", 0.8);
      }

      function updateLink(link) {
        link
          .attr("x1", function (d) {
            return fixna(d.source.x);
          })
          .attr("y1", function (d) {
            return fixna(d.source.y);
          })
          .attr("x2", function (d) {
            return fixna(d.target.x);
          })
          .attr("y2", function (d) {
            return fixna(d.target.y);
          });
      }

      function updateNode(node) {
        node.attr("transform", function (d) {
          return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
        });
      }

      function dragstarted(e, d) {
        e.sourceEvent.stopPropagation();

        // fix all
        graph.nodes.forEach(function (d, i) {
          d.fx = d.x;
          d.fy = d.y;
        });

        if (!e.active) graphLayout.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(e, d) {
        d.fx = e.x;
        d.fy = e.y;
      }

      function dragended(e, d) {
        // if (!d3.event.active) graphLayout.alphaTarget(0);
        if (!e.active) graphLayout.alphaTarget(0);

        // unfix dragged node
        //d.fx = null;
        //d.fy = null;
      }

      function getLinkDistance(d): number {
        const src = graph.nodes.find((n) => n.name === d.source.name);
        if (!src) return 100;
        const ty = types.find((ty) => ty.type === src.type);
        return ty ? ty.linkDistance : 100;
      }

      function getCharge(d): number {
        const ty = types.find((ty) => ty.type === d.type);
        return ty ? ty.charge : -4000;
      }
    });
  }
}
