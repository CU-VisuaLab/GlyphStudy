var width = 500,
    height = 500,
    halfRadius = 50;  // length of petal & therefore size of digram overall

var size = d3.scale.sqrt()
  .domain([0, 1])
  .range([0, halfRadius]);

var myPetalData = [
 {id:0, size:1},
 {id:1, size:2},
 {id:2, size:2.5},
 {id:3, size:.1}
]

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.size; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

var petal = svg.selectAll(".petal")
  .data(pie(myPetalData))
  .enter().append("path")
  .attr("class", "petal")
  .attr("transform", function(d) { return r((d.startAngle + d.endAngle) / 2); })
  .attr("d", petalPath)
  .style("stroke", petalStroke)
  .style("fill", petalFill);

function petalPath(d) {
  var angle = (d.endAngle - d.startAngle) / 2,
      s = polarToCartesian(-angle, halfRadius),
      e = polarToCartesian(angle, halfRadius),
      r = size(d.data.size),
      m = {x: halfRadius + r, y: 0},
      c1 = {x: halfRadius + r / 2, y: s.y},
      c2 = {x: halfRadius + r / 2, y: e.y};
  return "M0,0L" + s.x + "," + s.y + "Q" + c1.x + "," + c1.y + " " + m.x + "," + m.y + "L" + m.x + "," + m.y + "Q" + c2.x + "," + c2.y + " " + e.x + "," + e.y + "Z";
};

function petalFill(d, i) {
  return d3.hcl(i / myPetalData.length * 360, 60, 70);
};

function petalStroke(d, i) {
  return d3.hcl(i / myPetalData.length * 360, 60, 40);
};

function r(angle) {
  return "rotate(" + (angle / Math.PI * 180) + ")";
}

function polarToCartesian(angle, radius) {
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  };
};