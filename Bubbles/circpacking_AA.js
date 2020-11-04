//
var form = d3.select("#date");
form.on("input",finddataAA1);

// set the dimensions and margins of the graph
var width = 1560
var height = 960

// append the svg object to the body of the page
var svg = d3.select("#bubble")
  .append("svg")
    .attr("width", width)
    .attr("height", height);

    function finddataAA1(){
      svg.html("")

      
// Read data
d3.csv("DataForCirc/cleaned_data.csv", function(data) {


  // Filter the data for each year
  var data1 = data.filter((d) => d.year == d3.select("#date").property("value"))
 // Turn the data into numeric value
  data1.forEach(function(d){
    
    d.homicide = +d.homicide;
    d.motor_vehicle_theft = +d.motor_vehicle_theft
    d.aggravated_assault = +d.aggravated_assault
  })
  // Map the data to get the values for the column we need
  var mappeddata = data1.map(d => d.aggravated_assault)
  
  // Create a scale for the colors
  var color = d3.scaleSequential(d3.interpolatePuBu).domain([0,d3.max(mappeddata)])
    
  // Size scale for circles
  var sizecircle = d3.scaleLinear()
    .domain([0, d3.max(mappeddata)])
    .range([10,70])
  // Size scale for text
    var sizetext = d3.scaleLinear()
    .domain([0, d3.max(mappeddata)])
    .range([10,20])

  // create a tooltip
  var Tooltip = d3.select("#bubble")
    .append("div")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html('<u>' + d.state_abbr + '</u>' + "<br>" + d.aggravated_assault + " attacks")
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
  }
  //Append a group to the svg
    var group = svg
    .selectAll("g")
    .data(data1)
    .enter()
    .append("g")
  // Initialize the circle: all located at the center of the svg area
  var node = group    
    .append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return sizecircle(d.aggravated_assault)*2})
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", function(d){ return color(d.aggravated_assault)})
      .style("fill-opacity", 0.6)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));
  //Create the text that will showcase the state of the circle
  var text = group.append("text")
     .text(function(d) {
      return d.state_abbr;
      })
      .attr('x', 0)
      .attr('y', 0)
      .attr("font-family", "Georgia")
      .attr("font-size",function(d){ return sizetext(d.aggravated_assault)})
    

  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(3)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.4).radius(function(d){ return ((sizecircle(d.aggravated_assault)*2)+3) }).iterations(1)) // Force that avoids circle overlapping



      var simulation2 = d3.forceSimulation()
      
    
  // Apply these forces to the nodes and update their positions.
  
  simulation
      .nodes(data1)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
            
      });
  // Apply these forces to the text and update their positions.
      simulation2
      .nodes(data1)
      .on("tick", function(d){
        text
            .attr("x", function(d){ return (d.x -9); })
            .attr("y", function(d){ return (d.y +3); })
            simulation2.alphaTarget(1) // Keep value at 1 so simulation never ends
      });


      
  // Functions for when the circle gets dragged
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.1).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})
//Run the second function for the bar graph
finddataAA2()  }

