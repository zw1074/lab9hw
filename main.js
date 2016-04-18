//reference1: http://bl.ocks.org/weiglemc/6185069
//reference2: http://bl.ocks.org/mbostock/3887118
// Authors: Sida Ye(sy1743), Muhe Xie(mx419), Zihao Wang(zw1074)
// Also discuss d3.js with Lanyu Shang

var plotScatter = function(mpg_min,mpg_max) {
  var x_var_name = document.getElementById("sel-x").value;
  var y_var_name = document.getElementById("sel-y").value; 

   var padding = 10;
   var width =  650;
   var height = 450;
  //  x-axis 
  var xValue = function(d) { return d[x_var_name];},
      xScale = d3.scale.linear().range([0, width]), 
      xMap = function(d) { return xScale(xValue(d));}, 
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");

  //  y-axis
  var yValue = function(d) { return d[y_var_name];}, 
      yScale = d3.scale.linear().range([height, 0]), 
      yMap = function(d) { return yScale(yValue(d));}, 
      yAxis = d3.svg.axis().scale(yScale).orient("left");

  var svg = d3.select("svg")  
      .attr("width", 700)
      .attr("height", 500)
      .append("g")
      .attr("transform", "translate(" + 45 + "," + padding+ ")");

  // load data from csv file
    d3.csv("car.csv", function(error, data) {
      data.forEach(function(d) {
        
        console.log(mpg_max);
       
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horsepower = +d.horsepower;
            d.weight = +d.weight;
            d.acceleration = +d.acceleration;
            d["model.year"] = +d["model.year"];    
      

    });

    // 
    xScale.domain([d3.min(data, xValue)-7, d3.max(data, xValue)+7]);
    yScale.domain([d3.min(data, yValue)-7, d3.max(data, yValue)+7]);


    // x-axis
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis)
       .append("text")
       .attr("class", "label")
       .attr("x", width)
       .attr("y", -5)
       .style("text-anchor", "end")
       .text(x_var_name);

    // y-axis
    svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("class", "label")
       .attr("transform", "rotate(-90)")
       .attr("y", 5)
       .attr("dy", ".6em")
       .style("text-anchor", "end")
       .text(y_var_name);

    // scatter plots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .filter(function(d) { return d.mpg < mpg_max && d.mpg > mpg_min})
        .attr("class", "dot")
        .attr("r", 2)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .on("mouseover", function(d) {
           $('#hovered').text(d.name)
        });
  });
};



$(document).ready(function() {
  //original range,include all the points
  
  var mpg_min = +$('#mpg-min').val();
  var mpg_max = +$('#mpg-max').val();
  plotScatter(mpg_min,mpg_max);
  $("button").click(function() {
     window.location.reload();

    var mpg_min = +$('#mpg-min').val();
    var mpg_max = +$('#mpg-max').val();

    //$("#test").text("Hello world!");
    plotScatter(mpg_min,mpg_max);
    
  });
});








