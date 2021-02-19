d3.csv('../data/countryPopulation2020.csv', d3.autoType)
.then(data => {
    console.log("data", data)

// constants
const width = window.innerWidth; 
const height = window.innerHeight;

// SCALES
// xscale - categorical, country
const xScale = d3.scaleBand()
    .domain(data.map(d=> d.Country))
    .range([0, window.innerWidth]) // visual variables
    .paddingInner(.2)

// yscale - linear, Population
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.Population)])
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
    .attr("height", d=> height - yScale(d.Population))
    .attr("x", d=>xScale(d.Country))
    .attr("y", d=>yScale(d.Population))



}) 