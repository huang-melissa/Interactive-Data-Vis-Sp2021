/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedRegion: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.csv("../data/WHR20.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("raw_data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + DEFINE SCALES
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.social_support))
    .range([margin.left, width - margin.right]); 

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.ladder_score))
    .range([height - margin.bottom, margin.top])

  colorScale = d3.scaleOrdinal()
    .domain("Central and Eastern Europe", "Commonwealth of Independent States",
    "East Asia", "Latin America and Caribbean", "Middle East and North Africa",
    "North America and ANZ", "South Asia", "Southeast Asia", "Sub-Saharan Africa",
    "Western Europe"])
    .range(["orange", "blue", "purple", "pink", "red", "green",
  "brown", "gray", "turquoise", "beige"])

  // + DEFINE AXES
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale); 

  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("Selected region is", this.value); //select dropdown from HTML

    draw(); // re-draw the graph based on this new selection
  }); 
  // + add dropdown options
  selectElement
    .selectAll("option")
    .data([
      {key: "All", label: "All"}, 
      {key: "Central and Eastern Europe", label: "Central & Eastern Europe"} 
      {key: "Commonwealth of Independent States", label: "Commonwealth of Independent States"}
      {key: "East Asia", label: "East Asia"}
      {key: "Latin America and Caribbean", label: "Latin America & Caribbean"}
      {key: "Middle East and North Africa", label: "Middle East & North Africa"}
      {key: "North America and ANZ", label: "North America & ANZ"}
      {key: "South Asia", label: "South Asia"}
      {key: "Southeast Asia", label: "Southeast Asia"}
      {key: "Sub-Saharan Africa", label: "Sub-Saharan Africa"}
      {key: "Western Europe", label: "Western Europe"}])
    .join("option")
    .attr("value", d => d.key) // set the key to value so we can filter data
    .text(d => d.label); // set label to text for viewer's purpose

  // + add event listener for 'change'
  selectElement.on("change"), event => {
    // 'event' holds event info that triggers this callback
    console.log("DROPDOWN CALLBACK: new value is", event.target.value)
    // save new selection to application state
    state.selectedRegion = event.target.value
    console.log("NEW STATE:", state);
    draw(); // re-draw graph based on new filter selection
  }); 

  // + CREATE SVG ELEMENT
  svg = d3.select("d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height, height")

  // + CREATE AXES
  const xAxisGroup = svg.append("g")
    .attr("class", 'xAxis')
    .attr("transform", `translate(${0}, ${height - margin.bottom})`) // move to bottom
    .call(xAxis)

  const yAxisGroup = svg.append("g")
    .attr("class", 'yAxis')
    .attr("transform", `translate(${margin.left}, ${0})`) // alight with left margin

  // draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data 
    .filter(d => state.selectedRegion === "All" || state.selectedRegion === d.regional_indicator// <--- update to filter

  // + DRAW CIRCLES
  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.country_name) // second argument is the unique key for that row
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter.append("circle"),
        .attr("r", radius)
        .attr("fill", d => colorScale(d.regional_indicator))
        .attr("cx", d => yScale(d.ladder_score))
        .call(sel => sel.transition()
          .duration(500)
          .attr("cx", d => xScale(d.social_support)) // transition to correct position
          ),

      // + HANDLE UPDATE SELECTION
      update => update
        .call(sel => sel)
          .transition()
          .duration(250)
          .attr("r", radius * 1.5) // increase radius size
          .transition()
          .duration(250)
          .attr("r", radius) // bring back to orignal size
      ),

      // + HANDLE EXIT SELECTION
      exit => exit.remove()
      .call(sel => sel
        .attr("opacity", 1)
        .transition()
        .duration(500)
        .attr("opacity", 0)
        .remove()
      )
    );
}
