import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import allCountries from "../data/world_points.json";


export function WorldMap() {
    const width = window.innerWidth
    const height = width / 1.5
    const margin = 15

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
            .attr('width', width);

        const g = svg.append("g")
        g.selectAll("path")
            .data(allCountries.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                return d.properties['Total Cup Points'] !== null ? colorScale(d.properties['Total Cup Points']) : "lightgray";
            });
        return () => {
            svg.remove();
        };
    },[])


    return (
        <div className="map_container" ref={ref}/>
    );
}