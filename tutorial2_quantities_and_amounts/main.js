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
// yscale - linear, count
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.count)])
    .range([window.innerHeight, 0])

const svg = d3.select("#barchart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

// bars 



}) 