import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import allCountries from "../../data/world_points.json";

export function WorldMap(props) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const margin = width / 60;
    const colorBarWidth = 20;
    const colorBarHeight = height / 5;

    const colorScale = d3.scaleSequential()
        .domain([81.5329, 84.9609])
        .interpolator(d3.interpolateYlOrRd);
    const projection = d3.geoMercator()
        .translate([width / 2, height / 2 + 250])
        .scale(width / 2 / Math.PI - margin * 2);

    const path = d3.geoPath()
        .projection(projection);
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .append('svg')
            .attr('height', height)
            .attr('width', width + margin *2);

        const tooltip = d3.select(ref.current)
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "white")
            .style("padding", "5px")
            .style("border", "1px solid black")
            .style("border-radius", "5px")
            .style("pointer-events", "none")
            .style("opacity", 0);

        const g = svg.append("g")

        // Add color bar
        const colorBar = svg.append("g")
            .attr("class", "color-bar")
            .attr("transform", `translate(${width - colorBarWidth - margin *8}, ${margin*5})`);

        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        linearGradient.selectAll("stop")
            .data(d3.range(0, 1, 0.01).map(t => ({
                offset: `${t * 100}%`,
                color: colorScale(84.9609 + t * (81.5329 - 84.9609))
            })))
            .enter().append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        colorBar.append("rect")
            .attr("width", colorBarWidth)
            .attr("height", colorBarHeight)
            .style("fill", "url(#linear-gradient)");

        const colorScaleAxis = d3.scaleSequential()
            .domain([81.5, 85])
            .interpolator(d3.interpolateYlOrRd)
            .range([colorBarHeight, 0]);

        const colorAxis = d3.axisRight(colorScaleAxis)
            .ticks(8)
            .tickFormat(d3.format(".1f"));

        colorBar.append("g")
            .attr("transform", `translate(${colorBarWidth}, 0)`)
            .call(colorAxis)

        g.selectAll("path")
            .data(allCountries.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                const countryName = d.properties.name;
                const countryData = props.coffeeData[countryName];
                let points = null;

                if (props.selectedCoffeeType === "All Varieties" && countryData) {
                    points = d.properties["Total Cup Points"]; // Use total cup points from world data
                } else if (countryData) {
                    const varietyData = countryData.find(c => c.Variety === props.selectedCoffeeType);
                    points = varietyData ? varietyData["Total Cup Points"] : null;
                }

                return points !== null ? colorScale(points) : "lightgray"; // Color based on selected coffee type
            })
            .on("mouseover", (event, d) => {
                const countryName = d.properties.name;
                const countryData = props.coffeeData[countryName];
                let varieties = 'None';
                let totalCupPoints = 'None';

                if (countryData) {
                    varieties = countryData.map(entry => entry.Variety).join(' &#8226 '); // Get all varieties for the country
                    totalCupPoints = d.properties["Total Cup Points"].toFixed(2); // Get total cup points from world points data
                }

                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`<strong>Country:</strong> ${countryName}<br><strong>Total Cup Points:</strong> ${totalCupPoints}<br><strong>Varieties:</strong> ${varieties}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(500).style("opacity", 0);
            });

        return () => {
            svg.remove();
            tooltip.remove();
        };
    },[props])



    return (
        <div className="map_container" ref={ref}/>
    );
}