function createCirclesChart() {
// 1 - set up the screen and dimensions of the chart
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
 

  //2 - import data 
  d3.csv("assets/data/data.csv").then(function(csvData) {
    
    csvData.forEach(function(data) {
        //data.abbr = +data.abbr;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
    });  

    //create and append scales
    //start X scale not from 0, so that graph is not crawling towards the right margin
    //start Y scale not from 0 so that graph is centered
    x = d3.scaleLinear()
    .domain([29, d3.max(csvData, d => d.age)]).nice()
    .range([0, chartWidth]);

    y = d3.scaleLinear()
    .domain([6, d3.max(csvData, d => d.smokes)]).nice()
    .range([chartHeight, 0]);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(x);

    chartGroup.append("g")
    .call(y);

    //create Circles
    let circlesGroup = chartGroup.selectAll("circle")
        .data(csvData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.age))
        .attr("cy", d => y(d.smokes))
        .attr("r", 10)
        .attr("fill", "lightblue")
        .attr("opacity", ".6")
        .attr("stroke-width", "1")
        .attr("stroke", "black");

        chartGroup.select("g")
        .selectAll("circle")
        .data(csvData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => x(d.age))
        .attr("y", d => y(d.smokes))
        .attr("dy",-395)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black");

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

    chartGroup.append("g")
    .call(yAxis);

    //Create text for labels and position
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x",0-chartHeight/2-50)
      .text("Number of cigarettes a day");

    chartGroup.append("text")
      .attr("text-anchor", "end")
      .attr("x", chartWidth/2)
      .attr("y", chartHeight+50)
      .text("Age");
   
  });
}

  createCirclesChart();