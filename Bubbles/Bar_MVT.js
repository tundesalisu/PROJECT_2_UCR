// Define SVG area dimensions
var svgWidth = 1560;
var svgHeight = 960;


// Define the chart's margins
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 70
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Append SVG to chart
var svg1 = d3.select("#chart")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift it to the right and to the bottom
var chartGroup = svg1.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  function finddataMVT2(){
    // Clear html when new input is presented
      chartGroup.html("")

// Load data
d3.csv("DataForCirc/cleaned_data.csv", function(data) {

  console.log(data);
  var data2 = data.filter((d) => d.year == d3.select("#date").property("value"))
  // Cast value to a number for data
  data2.forEach(function(d) {
    d.homicide = +d.homicide;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(data2.map(d => d.state_abbr))
    .range([0, chartWidth])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data2, d => d.homicide)])
    .range([chartHeight, 0]);


  // Create two new functions passing our scales in as arguments

  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of data
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".bar")
    .data(data2)
    .enter()
    .append("rect")
    .attr("x", d => xBandScale(d.state_abbr))
    .attr("y", d => yLinearScale(d.homicide))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.homicide))
    .style("fill", "rgb(42, 117, 48)")

})};
