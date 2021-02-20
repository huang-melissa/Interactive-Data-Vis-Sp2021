d3.csv("../data/myActivity.csv", d3.autoType).then(data => {
    console.log(data);
  
    /** CONSTANTS */
    // constants help us reference the same values throughout our code
    const width = window.innerWidth * .8,
      height = window.innerHeight / 1.5,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 100, right: 100 }
  
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale
    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([width - margin.left, margin.right]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.activity))
      .range([height - margin.bottom, margin.top])
      .paddingInner(paddingInner);
    
    /** DRAWING ELEMENTS */
    const svg = d3.select("#barchart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

 // reference for d3.axis: https://github.com/d3/d3-axis
 const yAxis = d3.axisLeft(yScale).ticks(data.length);

const color = d3.scaleSequential()
    .domain([0, d3.max(data, d => d.count)])
    .interpolator(d3.interpolateYlOrRd)

    // draw rects
    const rect = svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 0, d => xScale(d.count))
      .attr("y", d => yScale(d.activity))
      .attr("height", yScale.bandwidth())
      .attr("width", d => width - margin.left - xScale(d.count))
      .attr("transform", `translate(200, ${height - margin.bottom, margin.top})`)
      .attr("fill", d=>color(d.count));
      
  
    // append text
    const text = svg
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("class", "label")
      // this allows us to position the text in the center of the bar
      .attr("y", d => yScale(d.activity) + (yScale.bandwidth()+5))
      .attr("x", 0, d => xScale(d.count))
      .text(d => d.count)
      .attr("dx", "205")
      .attr("fill", "#808080");
 
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(190, ${height - margin.bottom, margin.top})`)
      .call(yAxis)
      .style("text-anchor", "left")
      .text(d.activity);

    }) 

// d3.csv('../data/myActivity.csv', d3.autoType)
// .then(data => {
//    console.log("data", data)

// // set the dimensions and margins of the graph
// const margin = {top: 20, right: 30, bottom: 40, left: 90},
//     width = (window.innerWidth * .8) - margin.left - margin.right,
//     height = (window.innerHeight / 1.5) - margin.top - margin.bottom;

// // append the svg object to the body of the page
// const svg = d3.select("#barchart")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
        
//   // Add X axis
 
//  const x = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.count)])
//     .range([ 0, width]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//       .attr("transform", "translate(-10,0)rotate(-45)")
//       .style("text-anchor", "end");

// // color scale    
// color = d3.scaleSequential()
// .domain([0, d3.max(data, d => d.count)])
// .interpolator(d3.interpolateBlues)   

//   // Y axis
//   const y = d3.scaleBand()
//     .domain(data.map(d => d.activity))
//     .range([ 0, height ])
//     .padding(.1);
//   svg.append("g")
//     .call(d3.axisLeft(y))
    
//   //Bars
//   svg.selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("x", x(0) )
//     .attr("y", function(d) { return y(d.activity); })
//     .attr("width", function(d) { return x(d.count); })
//     .attr("height", y.bandwidth() )
//     .style("fill", "#d3d3d3");

// // Add X axis label:
// svg.append("text")
//     .attr("text-anchor", "end")
//     .style("font", "14px helvetica")
//     .style("fill", "#696969")
//     .attr("x", width -350)
//     .attr("y", height + margin.bottom)
//     .text("Count (in hours)");

// // Y axis label:
// svg.append("text")
//     .attr("text-anchor", "end")
//     .style("font", "14px helvetica")
//     .style("fill", "#696969")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -margin.left + 20)
//     .attr("x", -margin.top -150)
//     .text("Activity");


 
// // // Animation
// // svg.selectAll("rect")
// //   .transition()
// //   .duration(5000)
// //   .attr("y", function(d) { return y(d.count); })
// //   .attr("height", function(d) { return height - y(d.count); })
// //   .delay(function(d,i){console.log(i) ; return(i*100)})

// })   

// // This function is called by the buttons on top of the plot
// function changeColor(color){
//     d3.selectAll("rect")
//       .transition()
//       .duration(2000)
//       .style("fill", color)
//   }
  