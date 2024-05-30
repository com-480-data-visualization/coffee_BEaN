import React, {useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import '../Graph2.css'

//data
export const defaultCoffee = {
    name: "Default",
    color: "rgb(110,52,12)",
    profile: [
        { axis: "Aroma", value: 0.5 },
        { axis: "Flavor", value: 0.5 },
        { axis: "Aftertaste", value: 0.5 },
        { axis: "Acidity", value: 0.5 },
        { axis: "Body", value: 0.5 },
        { axis: "Balance", value: 0.5 },
    ]
}

function getClosest(coffee, data, k = 3) {
    let _coffee = coffee.profile.map(p => p.value)

    function dist(a, b) {
        return a.map((x, i) => (x - b[i]) ** 2).reduce((sum, now) => sum + now)
    }

    function compare(a, b) {
        let _a = a.profile.map(p => p.value)
        let _b = b.profile.map(p => p.value)
        return dist(_a, _coffee) - dist(_b, _coffee)
    }

    return data.sort(compare).slice(0, k)
}

//chart component
const InteractiveRadarChart = (props) => {
    //refs
    const svgRef = useRef();

    // configs
    const margin = { top: 80, right: 100, bottom: 50, left: 100 },
        width = Math.min(500, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20)

    const radarChartOptionsBig = {
        w: width,
        h: height,
        margin: margin,
        editable: true,
        showName: false,
        showLabels: true
    }
    const radarChartOptionsSmall = {
        w: width / 2,
        h: height / 2,
        margin: { top: 10, right: 10, bottom: 10, left: 10 }, //The margins of the SVG
        editable: false, //If true, the user can edit it
        showName: true, // If you want to show the labels
        showLabels: false // If you want to show the name of the bean
    }

    const [data, setData] = useState(defaultCoffee);
    const [options, setOptions] = useState(radarChartOptionsSmall);

    let other_config = {
        levels: 5, //How many levels or inner circles should there be drawn
        maxValue: 1, //What is the value that the biggest circle will represent
        labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
        opacityArea: 0.5, //The opacity of the area of the blob
        dotRadius: 4, //The size of the colored circles of each blog
        opacityCircles: 0.1, //The opacity of the circles of each blob
        strokeWidth: 2, //The width of the stroke around each blob
        roundStrokes: true, //If true the area and stroke will follow a round path (cardinal-closed)
    };

    const formatTooltip = function (d) {
        const gne =  [
                "Low",
                "Medium-low",
                "Medium",
                "Medium-high",
                "High",
            ];
        return gne[Math.floor(d.value * other_config.levels)];
    };


    //draws chart
    useEffect(() => {
        if(props.data) setData(props.data)
        if(props.isMain) setOptions(radarChartOptionsBig)

        let config = {...options, ...other_config}

        const allAxis = defaultCoffee.profile.map(d => d.axis), //Names of each axis
            total = allAxis.length, //The number of different axes
            radius = Math.min(config.w / 2, config.h / 2), //Radius of the outermost circle
            angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"
        //Scale for the radius
        const rScale = d3.scaleLinear().range([0, radius]).domain([0, config.maxValue]);

        d3.select(svgRef.current).select("svg").remove();

        const svg = d3
            .select(svgRef.current)
            .append("svg")
            .attr("width", config.w + config.margin.left + config.margin.right)
            .attr("height", config.h + config.margin.top + config.margin.bottom)
            .attr("class", "radar" + svgRef);

        const g = svg
            .append("g")
            .attr("transform", "translate(" + (config.w / 2 + config.margin.left) + "," + (config.h / 2 + config.margin.top) + ")");

        // GLOW

        const filter = g.append("defs").append("filter").attr("id", "glow"),
            feGaussianBlur = filter
                .append("feGaussianBlur")
                .attr("stdDeviation", "2.5")
                .attr("result", "coloredBlur"),
            feMerge = filter.append("feMerge"),
            feMergeNode_1 = feMerge.append("feMergeNode").attr("in", "coloredBlur"),
            feMergeNode_2 = feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // DRAW CIRCULAR GRID

        const axisGrid = g.append("g").attr("class", "axisWrapper");

        axisGrid.append("circle").attr("r", radius).style("fill", "black")

        axisGrid
            .selectAll(".levels")
            .data(d3.range(1, config.levels + 1).reverse())
            .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", d => (radius / config.levels) * d)
            .style("fill", "white")
            .style("fill-opacity", config.opacityCircles)

        // DRAW AXES

        const axis = axisGrid
            .selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => rScale(config.maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => rScale(config.maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-opacity", 0.1)
            .style("stroke-width", "2px");

        if (config.showLabels) {
            //Append the labels at each axis
            axis.append("text")
                .attr("class", "legend")
                .style("font-size", "1rem")
                .attr("text-anchor", "middle")
                .attr("x", (d, i) => rScale(config.maxValue * config.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
                .attr("y", (d, i) => rScale(config.maxValue * config.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
                .text(d => d)
        }

        // DRAW BLOB

        const radarLine = d3
            .lineRadial()
            .curve(d3.curveLinearClosed)
            .radius((d) => rScale(d.value))
            .angle((d, i) => i * angleSlice)

        if (config.roundStrokes) radarLine.curve(d3.curveCardinalClosed)

        const blobWrapper = g
            .selectAll(".radarWrapper")
            .data([data.profile])
            .enter()
            .append("g")
            .attr("class", "radarWrapper");

        blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", d => radarLine(d))
            .style("fill", defaultCoffee.color)
            .style("fill-opacity", config.opacityArea)

        blobWrapper
            .append("path")
            .attr("class", "radarStroke")
            .attr("d", function (d, i) {
                return radarLine(d);
            })
            .style("stroke-width", config.strokeWidth + "px")
            .style("stroke", defaultCoffee.color)
            .style("fill", "none")
            .style("filter", "url(#glow)");

        // INVISIBLE CIRCLES FOR DRAG + TOOLTIP

        const blobCircleWrapper = g
            .selectAll(".radarCircleWrapper")
            .data([data.profile])
            .enter()
            .append("g")
            .attr("class", "radarCircleWrapper");

        const tooltipWrapper = g.append("g").style("pointer-events", "none").attr("opacity", config.showName ? 1 : 0)

        const tooltipBg = tooltipWrapper.append("rect").attr("rx", "0.5rem").attr("fill", "black").attr("fill-opacity", 0.3)
        const tooltip = tooltipWrapper.append("text")
            .attr("class", "radarTooltip").attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-weight", "bold")
            .attr("font-size", radius > 100 ? "1rem" : "0.8rem")

        const updateTooltip = (val) => {
            tooltip.text(val)
            let textbb = tooltip.node().getBBox()
            tooltipBg.attr("x", textbb.x - 5).attr("y", textbb.y).attr("width", textbb.width + 10).attr("height", textbb.height)
        }

        updateTooltip(data.name)

        blobCircleWrapper
            .selectAll(".radarInvisibleCircle")
            .data(d => d)
            .enter()
            .append("circle")
            .attr("class", "radarInvisibleCircle")
            .attr("r", config.dotRadius * 2)
            .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
            .style("fill", "none")
            .style("pointer-events", "all")
            .style("cursor", "pointer")
            .on("mouseover", function (d) {
                tooltipWrapper.transition().duration(200).attr("opacity", 1)
                updateTooltip(formatTooltip(d))
                blobWrapper
                    .selectAll(".radarArea").transition().duration(200).style("fill-opacity", config.opacityArea - 0.2)
                blobWrapper
                    .selectAll(".radarStroke").transition().duration(200).style("stroke-opacity", 0.5)
            })
            .on("mouseout", function () {
                blobWrapper
                    .selectAll(".radarArea").transition().duration(200).style("fill-opacity", config.opacityArea)
                blobWrapper
                    .selectAll(".radarStroke").transition().duration(200).style("stroke-opacity", 1)

                if (config.showName) updateTooltip(data.name)
                else tooltipWrapper.transition().duration(200).attr("opacity", 0)
            })
        const drag = d3.drag()
            .on("drag", function (d, i) {
                let y = d3.mouse(this)[1]
                let x = d3.mouse(this)[0]
                let distFromCenter = Math.sqrt(y * y + x * x)
                d.value = Math.min(Math.max(0.1, rScale.invert(distFromCenter)), config.maxValue) // clamp value to not go outside of graphic
                d3.select(this)
                    .attr("cx", rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
                    .attr("cy", rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))

                tooltipWrapper.attr("opacity", 1)
                updateTooltip(formatTooltip(d))

                blobWrapper
                    .selectAll(".radarArea, .radarStroke")
                    .attr("d", (d) => radarLine(d))

                blobWrapper
                    .selectAll(".radarArea").style("fill-opacity", config.opacityArea - 0.2)
            })
            .on("end", function (d, i) {

                d.value = Math.round(d.value * config.levels) / config.levels
                d3.select(this)
                    .transition()
                    .attr("cx", rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
                    .attr("cy", rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))

                tooltipWrapper.attr("opacity", 0)

                blobWrapper
                    .selectAll(".radarArea, .radarStroke")
                    .attr("d", (d) => radarLine(d));

                blobWrapper
                    .selectAll(".radarArea").transition().duration(200).style("fill-opacity", config.opacityArea)

                // show closest
                //const closest = getClosestWine(data, tasteData, 3)
                //new RadarChart("#radarChart1", closest[0], radarChartOptionsSmall);
                //new RadarChart("#radarChart2", closest[1], radarChartOptionsSmall);
                //new RadarChart("#radarChart3", closest[2], radarChartOptionsSmall);
                if(config.editable) {
                    const closest = getClosest(data, props.allData);
                    props.func(closest);
                }
            });
        if (config.editable) blobCircleWrapper.selectAll(".radarInvisibleCircle").call(drag);
        
    }, [props,data]);

    return (<div className='interactive-radar' ref={svgRef}/>);
};


export default InteractiveRadarChart;