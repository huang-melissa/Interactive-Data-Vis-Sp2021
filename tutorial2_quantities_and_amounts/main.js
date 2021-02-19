
d3.csv('../data/myActivity.csv', d3.autoType)
.then(data => {
   console.log("data", data)

/** CONSTANTS */
    // constants help us reference the same values throughout our code
    const width = window.innerWidth * 0.9,
      height = window.innerHeight / 2,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 100, right: 100 };
  
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale
    

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.activity))
      .range([height - margin.bottom, margin.top])
      .paddingInner(paddingInner);
  
      const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([width - margin.left, margin.right]);
     

    // reference for d3.axis: https://github.com/d3/d3-axis
    const yAxis = d3.axisLeft(yScale).ticks(data.length);
  
    /** MAIN CODE */
    const svg = d3
      .select("#d3-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // append rects
    const rect = svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 0, d => xScale(d.count))
      .attr("y", d => yScale(d.activity))
      .attr("height", yScale.bandwidth())
      .attr("width", d => width - margin.left - xScale(d.count))
      .attr("transform", `translate(200, ${height - margin.bottom, margin.top})`)
      .attr("fill", "black");
   
      const text = svg
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("y", d => yScale(d.activity) + (yScale.bandwidth()+15))
      .attr("x", 0, d => xScale(d.count))
      .text(d => d.count)
      .attr("dx", "220")
      .attr("fill", "white");




  
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(195, ${height - margin.bottom, margin.top})`)
      .call(yAxis)
      .style("text-anchor", "left")
      .text(d.activity);
  });

 
// constants
// const width = window.innerWidth; 
// const height = window.innerHeight;
// margin = { top: 20, bottom: 40, left: 100, right: 100 };

// SCALES
// xscale - categorical, activity
// const xScale = d3.scaleBand()
//     .domain(data.map(d=> d.activity))
//     .range([0, window.innerWidth]) // visual variables
//     .paddingInner(.2)

// yscale - linear, Population
// const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d=> d.count)])
//     .range([window.innerHeight, 0])

// const svg = d3.select("#barchart")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)

// bars
// select element you want
// map aka data join
// draw elements or style 

// svg.selectAll("rect")
//     .data(data)
//     .join("rect")
//     .attr("width", xScale.bandwidth())
//     .attr("height", d=> height - yScale(d.count))
//     .attr("x", d=>xScale(d.activity))
//     .attr("y", d=>yScale(d.count))



// }) 