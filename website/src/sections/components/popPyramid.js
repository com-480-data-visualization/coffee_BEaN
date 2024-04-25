import * as d3 from 'd3';
import $ from 'jquery';
//source: https://github.com/doylek/D3-Population-Pyramid (edited)

export function pyramidBuilder(data, container, options) {
    var chartWidth = typeof options.width === "undefined" ? 400 : options.width,
        chartHeight = typeof options.height === "undefined" ? 400 : options.height,
        svgWidth = chartWidth,
        svgHeight = chartHeight;
  
    if (chartWidth > $(window).width()) {
      chartWidth = $(window).width();
    }
  
    var margins = {
      top: 50,
      right: 10,
      bottom: 20,
      left: 10,
      middle: 20
    };
  
    var innerChartWidth = (chartWidth / 2) - margins.middle,
        leftChartWidth = innerChartWidth - margins.left,
        rightChartWidth = chartWidth - margins.right - innerChartWidth;
    chartWidth = chartWidth - (margins.left + margins.right);
    chartHeight = chartHeight - (margins.top + margins.bottom);
  
    if (typeof options.style === "undefined") {
      var colors = {
        leftBarColor: "#6c9dc6",
        rightBarColor: "#de5454",
        tooltipBG: "#fefefe",
        tooltipColor: "black"
      };
    } else {
      var colors = {
        leftBarColor: typeof options.style.leftBarColor === "undefined" ? "#6c9dc6" : options.style.leftBarColor,
        rightBarColor: typeof options.style.rightBarColor === "undefined" ? "#de5454" : options.style.rightBarColor,
        tooltipBG: typeof options.style.tooltipBG === "undefined" ? "#fefefe" : options.style.tooltipBG,
        tooltipColor: typeof options.style.tooltipColor === "undefined" ? "black" : options.style.tooltipColor
      };
    }
  
    var totalPopulation = d3.sum(data, function(datum) {
      return datum.male + datum.female;
    });
  
    var percentage = function(value) {
      return value / totalPopulation;
    };
  
    var cssStyles = d3.select(container).append("style").text(`
      svg {max-width:100%}
      .axis line,axis path {shape-rendering: crispEdges;fill: transparent;stroke: #555;}
      .axis text {font-size: 11px;}
      .bar {fill-opacity: 0.5;}
      .bar.left {fill: ${colors.leftBarColor};}
      .bar.left:hover {fill: ${calculateColor(colors.leftBarColor, "333333")};}
      .bar.right {fill: ${colors.rightBarColor};}
      .bar.right:hover {fill: ${calculateColor(colors.rightBarColor, "333333")};}
      .tooltip {position: absolute;line-height: 1.1em;padding: 7px; margin: 3px;background: ${colors.tooltipBG}; color: ${colors.tooltipColor}; pointer-events: none;border-radius: 6px;}
    `);
  
    var svg = d3.select(container).append("svg").attr("width", svgWidth).attr("height", svgHeight);
    var legend = svg.append("g").attr("class", "legend");
  
    legend.append("rect").attr("class", "bar left").attr("x", (chartWidth / 2) - (margins.middle * 3)).attr("y", 12).attr("width", 12).attr("height", 12);
    legend.append("text").attr("fill", "#000").attr("x", (chartWidth / 2) - (margins.middle * 2)).attr("y", 18).attr("dy", "0.32em").text("Males");
    legend.append("rect").attr("class", "bar right").attr("x", (chartWidth / 2) + (margins.middle * 2)).attr("y", 12).attr("width", 12).attr("height", 12);
    legend.append("text").attr("fill", "#000").attr("x", (chartWidth / 2) + (margins.middle * 3)).attr("y", 18).attr("dy", "0.32em").text("Females");
  
    var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    var innerChart = svg.append("g").attr("class", "inner-region").attr("transform", translate(margins.left, margins.top));
  
    var maxPercentage = Math.ceil(Math.max(
      d3.max(data, function(datum) {
        return percentage(datum.male);
      }),
      d3.max(data, function(datum) {
        return percentage(datum.female);
      })
    ) / 0.05) * 0.05;
  
    var xScale = d3.scaleLinear().domain([0, maxPercentage]).range([0, (leftChartWidth - margins.middle)]).nice();
    var leftYScale = d3.scaleLinear().domain([0, maxPercentage]).range([leftChartWidth, 0]);
    var rightYScale = d3.scaleLinear().domain([0, maxPercentage]).range([0, leftChartWidth]);
  
    var ageScale = d3.scaleBand().domain(data.map(function(datum) {
      return datum.age;
    })).range([chartHeight, 0], 0.1);
  
    var leftAxis = d3.axisRight().scale(ageScale).tickSize(4, 0).tickPadding(margins.middle - 4);
    var rightAxis = d3.axisLeft().scale(ageScale).tickSize(4, 0).tickFormat("");
    var bottomAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format(".0%"));
    var topAxis = d3.axisBottom().scale(xScale.copy().range([leftChartWidth, 0])).tickFormat(d3.format(".0%"));
  
    var leftBars = innerChart.append("g").attr("transform", translate(leftChartWidth, 0) + "scale(-1,1)");
    var rightBars = innerChart.append("g").attr("transform", translate(rightChartWidth, 0));
  
    innerChart.append("g").attr("class", "axis y left").attr("transform", translate(leftChartWidth, 0)).call(leftAxis).selectAll("text").style("text-anchor", "middle");
    innerChart.append("g").attr("class", "axis y right").attr("transform", translate(rightChartWidth, 0)).call(rightAxis);
    innerChart.append("g").attr("class", "axis x left").attr("transform", translate(0, chartHeight)).call(topAxis);
    innerChart.append("g").attr("class", "axis x right").attr("transform", translate(rightChartWidth, chartHeight)).call(bottomAxis);
  
    leftBars.selectAll(".bar.left").data(data).enter().append("rect")
      .attr("class", "bar left")
      .attr("x", 0)
      .attr("y", function(datum) {
        return ageScale(datum.age) + margins.middle / 4;
      })
      .attr("width", function(datum) {
        return xScale(percentage(datum.male));
      })
      .attr("height", (ageScale.range()[0] / data.length) - margins.middle / 2)
      .on("mouseover", function(event, datum) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html("<strong>Males Age " + datum.age + "</strong><br />  Population: " + formatPopulation(datum.male) + "<br />" + (Math.round(percentage(datum.male) * 1000) / 10) + "% of Total" + "<br /><strong>Most Common Cups Per Day: " + datum.hoverMale[0][1] + "</strong><br />Most Common Place to Drink: " + datum.hoverMale[1][1] + "<br />Most Common Favourite Drink: " + datum.hoverMale[2][1] + "<br />Most Common Coffee Strength: " + datum.hoverMale[3][1])
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(datum) {
        tooltip.transition().duration(500).style("opacity", 0);
      });
  
    rightBars.selectAll(".bar.right").data(data).enter().append("rect")
      .attr("class", "bar right")
      .attr("x", 0)
      .attr("y", function(datum) {
        return ageScale(datum.age) + margins.middle / 4;
      })
      .attr("width", function(datum) {
        return xScale(percentage(datum.female));
      })
      .attr("height", (ageScale.range()[0] / data.length) - margins.middle / 2)
      .on("mouseover", function(event, datum) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html("<strong>Females Age " + datum.age + "</strong><br />  Population: " + formatPopulation(datum.female) + "<br />" + (Math.round(percentage(datum.female) * 1000) / 10) + "% of Total" + "<br /><strong>Most Common Cups Per Day: " + datum.hoverFemale[0][1] + "</strong><br />Most Common Place to Drink: " + datum.hoverFemale[1][1] + "<br />Most Common Favourite Drink: " + datum.hoverFemale[2][1] + "<br />Most Common Coffee Strength: " + datum.hoverFemale[3][1])
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(datum) {
        tooltip.transition().duration(500).style("opacity", 0);
      });
  
    function translate(x, y) {
      return "translate(" + x + "," + y + ")";
    }
  
    function formatPopulation(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  
    function calculateColor(hexColor, hexDelta) {
      var hexColor = hexColor.replace("#", "");
      var origHex = {
        r: hexColor.substring(0, 2),
        g: hexColor.substring(2, 4),
        b: hexColor.substring(4, 6)
      };
  
      var transVec = {
        r: hexDelta.substring(0, 2),
        g: hexDelta.substring(2, 4),
        b: hexDelta.substring(4, 6)
      };
  
      var newHex = {};
  
      function addHexValues(value1, value2) {
        var result = parseInt(value1, 16) + parseInt(value2, 16);
        if (result > 255) {
          result = 255;
        }
        return result.toString(16);
      }
  
      newHex.r = addHexValues(origHex.r, transVec.r);
      newHex.g = addHexValues(origHex.g, transVec.g);
      newHex.b = addHexValues(origHex.b, transVec.b);
  
      return "#" + newHex.r + newHex.g + newHex.b;
    }
  };

