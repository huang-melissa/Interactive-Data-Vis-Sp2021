/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.8,
  height = window.innerHeight * 0.8,
  margin = { top: 25, bottom: 75, left: 75, right: 25 },
  radius = 3;

//const formatBillions = (num) => d3.format(".2s")(num).replace(/G/, 'B')
const formatDate = d3.timeFormat("%Y")
// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let yAxis;
let xAxisGroup;
let yAxisGroup;


/* APPLICATION STATE */
let state = {
  data: [],
  selectedCountry: "Country", // + YOUR FILTER SELECTION
};


/* LOAD DATA */
// + SET YOUR DATA PATH

d3.csv('../data/globalses.csv', d3.autoType, (d) => {
  const Object = {
    country: d.country,
    SES: +d.SES,
    year: new Date(+d.year, 01, 01)
  }
  return Object
})

  .then(data => {
    console.log("loaded data:", data);
    state.data = data;
    init();

  });

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {

  // + SCALES
  xScale = d3.scaleTime()
    .domain(d3.extent(state.data, d => d.year))
    .range([margin.left, width - margin.right])
  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d =>d.SES))
    .range([height - margin.bottom, margin.top])
  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)
  // + UI ELEMENT SETUP
  const dropdown = d3.select('#dropdown')

  // add in dropdown options from the unique values in the data
  dropdown.selectAll("option")
    .data(
      Array.from(new Set(state.data.map(d => d.country))))
    .join("option")
    .attr("value", d => d)
    .text(d => d)
  console.log("dropdown: ", dropdown)
  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)
  
  dropdown.on("change", event => {
    console.log("dropdown changed!", event.target.value)
    state.selectedCountry = event.target.value
    console.log("new state", state)
    draw();
  })
  // + CREATE SVG ELEMENT
  svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
  xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .call(xAxis)
  
  xAxisGroup.append("text")
    .attr("class", 'xLabel')
    .attr("transform", `translate(${width / 2}, ${40})`)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("letter-spacing", "0.2em")
    .attr("font-size","12")
    .attr("style","fill:#4f5d68")
    .text("Year")
  
  yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(yAxis)

  yAxisGroup.append("text")
    .attr("class", 'yLabel')
    .attr("transform", `translate(${-40}, ${height / 2})`)
    .attr("writing-mode", 'vertical-rl')
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("letter-spacing", "0.2em")
    .attr("font-size","12")
    .attr("style","fill:#4f5d68")
    .text("Socioeconomic Status Score")

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => d.country === state.selectedCountry)

  // + UPDATE SCALE(S), if needed

  // + UPDATE AXIS/AXES, if needed
  // + DRAW CIRCLES/LABEL GROUPS, if you decide to
  const dots = svg
    .selectAll(".dot")
    .data(filteredData, d => d.year)
    .join(
      enter => enter.append("g")
        .attr("class", "dot")
        .attr("transform", d => `translate(${xScale(d.year)}, ${yScale(d.SES)})`),
      update => update
        .call(update => update.transition()
          .duration(1500)
          .attr("transform", d => `translate(${xScale(d.year)}, ${yScale(d.SES)})`)
        ),
      exit => exit.remove()
    );
  
  dots.selectAll("circle")
    .data(d => [d]) // pass along data from parent to child
    .join("circle")
    .attr("r", radius)
    .attr("fill", "#4f5d68")
  
  // add tooltip
  dots.selectAll("text")
      .data(d => [d]) // pass along data from parent to child
      .join("text")
      .attr("text-anchor", "start")
      .attr('opacity', '0')
      .text(d => `${formatDate(d.year)}'s SES: ${d3.format(",")(d.SES)} `)
      .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr('opacity', '.8')
            .attr("fill", "#000000");
        })
      .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr('opacity', '0');
        })

    

  // + DEFINE LINE GENERATOR FUNCTION
  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.SES))

  // + DRAW LINE AND/OR AREA
  
  svg.selectAll(".line")
    .data([filteredData]) // data needs to take an []
    .join("path")
    .attr("class", 'line')
    .attr("fill", "none")
    .attr("stroke", "#4f5d68")
    .transition()
    .duration(1000)
    .attr("d", d => lineGen(d))
  
  const area = d3.area()
    .x(d => xScale(d.year))
    .y0(yScale(0))
    .y1(d => yScale(d.SES))

  svg.selectAll(".area")
    .data([filteredData]) // data needs to take an []
    .join("path")
    .attr("class", 'area')
    .attr("fill", "#a4c2da")
    .transition()
    .duration(1000)
    .attr("d", d => area(d))

} 
