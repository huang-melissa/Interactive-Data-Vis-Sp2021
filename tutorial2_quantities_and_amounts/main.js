d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
    console.log("data", data)

// constants
const width = window.innerWidth;
const height = window.innerHeight

// SCALES
// xscale - categorical, activity
const xScale = d3.scaleBand()
    .domain(data.map(d=> d.activity))
    .range([0, window.innerWidth]) // visual variables
    .paddingInner(.3)

// yscale - linear, count
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.count)])
    .range([window.innerHeight, 0])

const svg = d3.select("#barchart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

// bars
// select element you want
// map aka data join
// draw elements or style 

svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", d=> height - yScale(d.count))
    .attr("x", d=>xScale(d.activity))
    .attr("y", d=>yScale(d.count))





}) 